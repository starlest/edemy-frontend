import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Level} from '../models/level';

@Injectable()
export class LevelsService {
  private baseUrl: string = environment.apiEndpoint + 'levels';

  constructor(private http: Http) {
  }

  // calls the [GET] /api/levels Web API method to retrieve all lessons
  get() {
    return this.http.get(this.baseUrl)
      .map((response: Response) => response.json() as Level[])
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    // output errors to the console.
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }
}
