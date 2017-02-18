import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthHttp} from '../auth.http';
import {Response} from '@angular/http';
import {Level} from '../models/level';
import {environment} from '../../environments/environment';
import { Quiz } from '../models';

@Injectable()
export class QuizzesService {
	private baseUrl: string = environment.apiEndpoint + 'quizzes';

	constructor(private http: AuthHttp) {
	}

	// calls the [GET] /api/quizzes Web API method to retrieve all lessons
	get(): any {
		return this.http.get(this.baseUrl)
		  .map((response: Response) => response.json() as Quiz[])
		  .catch(this.handleError);
	}

	private handleError(error: Response) {
		// output errors to the console.
		console.error(error);
		return Observable.throw(error.json().error || "Server error");
	}
}
