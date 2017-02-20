import { Response } from '@angular/http';
import { Observable } from 'rxjs';

// Converts a Json object to urlencoded format
export function toUrlEncodedString(data: any) {
	let body = "";
	for (let key in data) {
		if (data.hasOwnProperty(key)) {
			if (body.length) body += "&";
			body += key + "=";
			body += encodeURIComponent(data[key]);
		}
	}
	return body;
}

export function handleError(error: Response) {
	// output errors to the console.
	console.error(error);
	return Observable.throw(error.json().error || "Server error");
}
