import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AuthHttp } from '../auth.http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { handleError } from './util';
import { Student } from '../models';

@Injectable()
export class StudentsService {
	private baseUrl: string = environment.apiEndpoint + 'students';

	constructor(private http: AuthHttp) {
	}

	/**
	 * 	Calls the [GET] /api/students Web API method to retrieve all students
 	 */
	get(): any {
		return this.http.get(this.baseUrl)
		  .map((response: Response) => response.json() as Student[])
		  .catch(handleError);
	}
}
