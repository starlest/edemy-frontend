import { Injectable } from '@angular/core';
import { AuthHttp } from '../auth.http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Student } from '../models';
import { handleError, getRequestOptions } from './util';
import { Observable } from 'rxjs';

@Injectable()
export class StudentsService {
	private baseUrl: string = environment.apiEndpoint + 'students';

	constructor(private http: AuthHttp) {
	}

	/**
	 * Calls the [GET] /students Web API method to retrieve all students
	 * @returns {Observable<any>} rxjs Observable encapsulating the response's
	 * result
	 */
	get(): Observable<any> {
		return this.http.get(this.baseUrl)
		  .map((response: Response) => response.json() as Student[])
		  .catch(handleError);
	}

	/**
	 * 	Calls the [POST] /students Web API method to add a new student
	 */
	add(student: Student) {
		const url = this.baseUrl;
		return this.http.post(url, JSON.stringify(student), getRequestOptions())
		  .map((response: Response) => response.json())
		  .catch(handleError);
	}
}
