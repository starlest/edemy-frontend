import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { AuthHttp } from '../auth.http';
import { Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Quiz } from '../models';
import { handleError } from './util';

@Injectable()
export class QuizzesService {
	private baseUrl: string = environment.apiEndpoint + 'quizzes';

	constructor(private http: AuthHttp) {
	}

	// calls the [GET] /api/quizzes Web API method to retrieve all lessons
	get(): any {
		return this.http.get(this.baseUrl)
		  .map((response: Response) => response.json() as Quiz[])
		  .catch(handleError);
	}
}
