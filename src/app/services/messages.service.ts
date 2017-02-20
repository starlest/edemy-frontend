import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from '../auth.http';
import { Response, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { handleError } from './util';

@Injectable()
export class MessagesService {
	private baseUrl: string = environment.apiEndpoint + 'messages';

	constructor(private http: AuthHttp) {
	}

	// calls the [POST] /api/messages/query Web API method to send submit a
	// query
	postQuery(query: any): any {
		const url = this.baseUrl + '/query';
		return this.http.post(url, JSON.stringify(query),
		  this.getRequestOptions())
		  .map(result => result)
		  .catch(handleError)
	}

	// returns a viable RequestOptions object to handle Json requests
	private getRequestOptions() {
		return new RequestOptions({
			headers: new Headers({
				"Content-Type": "application/json"
			})
		});
	}
}
