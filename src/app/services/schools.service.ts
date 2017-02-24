import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {School} from '../models';
import {environment} from '../../environments/environment';
import {AuthHttp} from '../auth.http';
import { handleError } from './util';

@Injectable()
export class SchoolsService {
	private baseUrl: string = environment.apiEndpoint + 'schools';

	constructor(private http: AuthHttp) {
	}

	// calls the [GET] /api/schools Web API method to retrieve all schools
	get() {
		return this.http.get(this.baseUrl)
		  .map((response: Response) => response.json() as School[])
		  .catch(handleError);
	}
}
