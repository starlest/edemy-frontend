import {Injectable} from '@angular/core';
import {RequestOptions, Headers} from '@angular/http';
import {environment} from '../../environments/environment';
import {AuthHttp} from '../auth.http';
import {Observable} from 'rxjs';
import {AuthEntity} from '../models/auth-entity';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

@Injectable()
export class AuthService {
  authKey = environment.authKey;

  constructor(private store: Store<fromRoot.State>,
              private http: AuthHttp) {
  }

  login(username: string, password: string, rememberUser: boolean): any {
    this.setAuthInLocalStorage(null); // remove existing authKey
    const data = {
      username: username,
      password: password,
    };
    return this.getAuth(data, 'password', rememberUser);
  }

  logout(): any {
    const url = environment.apiEndpoint + 'Accounts/Logout'; // LogoutPath
    return this.http.post(url, null)
      .map(() => this.setAuthInLocalStorage(null))
      .catch(err => Observable.throw(err));
  }

  // Persist auth into localStorage or removes it if a NULL argument is given
  setAuthInLocalStorage(auth: AuthEntity) {
    if (auth)
      localStorage.setItem(this.authKey, JSON.stringify(auth));
    else
      localStorage.removeItem(this.authKey);
  }

  // Retrieves the auth JSON object (or NULL if none)
  getAuthInLocalStorage(): AuthEntity {
    const i = localStorage.getItem(this.authKey);
    if (i) return JSON.parse(i);
    else return null;
  }

  getAuth(data: any, grantType: string,
          storeInLocalStorage: boolean = false): Observable<AuthEntity> {
    const url = environment.apiEndpoint + 'connect/token'; // JwtProvider's
    // LoginPath

    Object.assign(data, {
      client_id: 'Edemy',
      grant_type: grantType,
      // offline_access is required for a refresh token
      scope: ['openid offline_access profile email']
    });

    // data can be any since it can either be a refresh tokens or login details
    // The request for tokens must be x-www-form-urlencoded
    let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    let options = new RequestOptions({headers: headers});

    return this.http.post(url, this.toUrlEncodedString(data), options)
      .map(res => res.json())
      .map((authToken: AuthEntity) => {
        let now = new Date();
        authToken.expiration_date =
          new Date(now.getTime() + authToken.expires_in * 1000).getTime()
            .toString();
        if (storeInLocalStorage) this.setAuthInLocalStorage(authToken);
        return authToken;
      })
      .catch(err => Observable.throw(err));
  }

  // Refresh auth with the server
  refreshAuth(): Observable<AuthEntity> {
    return this.store.select(fromRoot.getAuthEntity)
      .first()
      .switchMap((authEntity: AuthEntity) => {
        return this.getAuth({refresh_token: authEntity.refresh_token},
          'refresh_token')
          // This should only happen if the refresh token has expired
          .catch(error => {
            // let the app know that we cant refresh the token
            // which means something is invalid and they aren't logged in
            console.log(error);
            return Observable.throw('Session Expired')
          });
      });
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
}
