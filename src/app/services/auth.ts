import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from '@angular/http';
import {environment} from '../../environments/environment';
import {AuthHttp} from '../auth.http';
import {Observable} from 'rxjs';

@Injectable()
export class AuthService {
  authKey = 'auth';

  constructor(private http: AuthHttp) {
  }

  // TODO: Implement remember user

  login(username: string, password: string, rememberUser: boolean): any {
    const url = environment.apiEndpoint + 'connect/token'; // JwtProvider's
                                                           // LoginPath
    const data = {
      username: username,
      password: password,
      client_id: 'Edemy',
      /// required when signing in with username/password
      grant_type: 'password',
      // space-separated list of scopes for which the token is issued
      scope: 'openid offline_access profile email'
    };

    this.setAuth(null); // remove existing authKey

    return this.http.post(url, this.toUrlEncodedString(data),
      new RequestOptions({
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }))
      .map(response => {
        const auth = response.json();
        console.log('The following auth JSON object has been received:');
        console.log(auth);
        if (rememberUser) this.setAuth(auth);
        return auth;
      })
      .catch(err => Observable.throw(err));
  }

  logout(): any {
    const url = environment.apiEndpoint + 'Accounts/Logout'; // LogoutPath
    return this.http.post(url, null)
      .map(() => this.setAuth(null))
      .catch(err => Observable.throw(err));
  }

  // Converts a Json object to urlencoded format
  toUrlEncodedString(data: any) {
    let body = "";
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (body.length) body += "&";
        body += key + "=";
        body += encodeURIComponent(data[key]);
      }
    }
    return body;
  }

  // Persist auth into localStrage or removes it if a NULL argument is given
  setAuth(auth: any): boolean {
    if (auth)
      localStorage.setItem(this.authKey, JSON.stringify(auth));
    else
      localStorage.removeItem(this.authKey);
    return true;
  }

  // Retrieves the auth JSON object (or NULL if none)
  getAuth(): any {
    const i = localStorage.getItem(this.authKey);
    if (i) return JSON.parse(i);
    else return null;
  }

  // Returns TRUE if the user is logged in, FALSE otherwiswe.
  isLoggedIn(): boolean {
    return localStorage.getItem(this.authKey) != null;
  }
}
