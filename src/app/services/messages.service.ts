import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from '../auth.http';
import { environment } from '../../environments/environment';
import { handleError, getRequestOptions } from './util';

@Injectable()
export class MessagesService {
	private baseUrl: string = environment.apiEndpoint + 'messages';

	constructor(private http: AuthHttp) {
	}

	/**
	 * calls the [POST] /messages/query Web API method to submit a query
	 * @param query Query message to be sent
	 * @returns {Observable<any>} rxjs Observable encapsulating the response's
	 * result
	 */
	postQuery(query: any): Observable<any> {
		const url = this.baseUrl + '/query';
		return this.http.post(url, JSON.stringify(query), getRequestOptions())
		  .map(result => result)
		  .catch(handleError)
	}
}
