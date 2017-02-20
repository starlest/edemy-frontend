import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import { Subject } from '../models/subject';
import { environment } from '../../environments/environment';
import { AuthHttp } from '../auth.http';
import { handleError } from './util';

@Injectable()
export class WorksheetsService {
	private baseUrl: string = environment.apiEndpoint + 'worksheets';

	constructor(private http: AuthHttp) {
	}

	// calls the [GET] /api/worksheets Web API method to retrieve all lessons
	get() {
		return this.http.get(this.baseUrl)
		  .map((response: Response) => response.json() as Subject[])
		  .catch(handleError);
	}
}
