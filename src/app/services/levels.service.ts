import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {environment} from '../../environments/environment';
import {Level} from '../models/level';
import {AuthHttp} from '../auth.http';
import { handleError } from './util';

@Injectable()
export class LevelsService {
  private baseUrl: string = environment.apiEndpoint + 'levels';

  constructor(private http: AuthHttp) {
  }

  // calls the [GET] /api/levels Web API method to retrieve all lessons
  get() {
    return this.http.get(this.baseUrl)
      .map((response: Response) => response.json() as Level[])
      .catch(handleError);
  }
}
