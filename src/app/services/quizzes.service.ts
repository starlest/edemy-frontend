import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AuthHttp } from '../auth.http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Quiz } from '../models';
import { handleError } from './util';
import { Observable } from 'rxjs';

@Injectable()
export class QuizzesService {
	private baseUrl: string = environment.apiEndpoint + 'quizzes';

	constructor(private http: AuthHttp) {
	}

	/**
	 * Calls the [GET] /quizzes Web API method to retrieve all quizzes
	 * @returns {Observable<any>} rxjs Observable encapsulating the response's
	 * result
	 */
	get(): Observable<any> {
		return this.http.get(this.baseUrl)
		  .map((response: Response) => response.json() as Quiz[])
		  .catch(handleError);
	}
}
