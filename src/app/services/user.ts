import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {AuthHttp} from '../auth.http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import {Response, RequestOptions, Headers} from '@angular/http';

@Injectable()
export class UserService {
  private baseUrl: string = environment.apiEndpoint + 'accounts';

  constructor(private http: AuthHttp) {
  }

  /**
   * calls the [GET] /api/accounts Web API method to retrieve the current user
   * @returns {Observable<User>}
   */
  get(): Observable<User> {
    return this.http.get(this.baseUrl)
      .map((response: Response) => response.json() as User)
      .catch(err => Observable.throw(err));
  }
}
