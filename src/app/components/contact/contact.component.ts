import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';

@Component({
	selector: 'ed-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
	contactForm: FormGroup;
	url = environment.apiEndpoint + 'messages/query';

	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder,
	            private http: Http) {
		this.contactForm = fb.group({
			Name: ['', Validators.required],
			Email: ['', Validators.required],
			Phone: ['', Validators.required],
			Query: ['', Validators.required],
			Captcha: ['', Validators.required]
		});
	}

	ngOnInit() {
		this.store.dispatch(new layout.ChangeTitleAction('Contact'));
	}

	sendCustomerQuery() {
		console.log(this.contactForm.value.Captcha);
		this.http.post(this.url, JSON.stringify(this.contactForm.value),
		  this.getRequestOptions()).subscribe();
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
