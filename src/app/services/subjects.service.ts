import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from '../models/subject';
import {environment} from '../../environments/environment';
import {AuthHttp} from '../auth.http';
import { handleError } from './util';

@Injectable()
export class SubjectsService {
  private baseUrl: string = environment.apiEndpoint + 'subjects';

  constructor(private http: AuthHttp) {
  }

  // calls the [GET] /api/subjects Web API method to retrieve all lessons
  get() {
    return this.http.get(this.baseUrl)
      .map((response: Response) => response.json() as Subject[])
      .catch(handleError);
  }
}
