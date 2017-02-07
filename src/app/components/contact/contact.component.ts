import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout.actions';
import {
	FormGroup, FormBuilder, Validators, AbstractControl
} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MessagesService } from '../../services/';

@Component({
	selector: 'ed-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
	contactForm: FormGroup;
	captchaControl: AbstractControl;
	submitted: boolean = false;
	result: string;
	url = environment.apiEndpoint + 'messages/query';

	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder,
	            private messagesService: MessagesService) {
		this.contactForm = fb.group({
			Name: ['', Validators.required],
			Email: ['', Validators.required],
			Phone: ['', Validators.required],
			Query: ['', Validators.required],
			Captcha: ['', Validators.required]
		});
		this.captchaControl = this.contactForm.controls['Captcha'];
	}

	ngOnInit() {
		this.store.dispatch(new layout.ChangeTitleAction('Contact'));
	}

	sendCustomerQuery() {
		if (!this.contactForm.valid) return;
		this.submitted = true;
		this.messagesService.postQuery(this.contactForm.value)
		  .map(result => {
			  this.result = 'Your query has been sent successfully!';
			  this.contactForm.reset();
		  })
		  .catch(err => {
			  this.result = 'Failed to send query, please try again.';
			  console.log(err)
		  })
		  .do(() => this.submitted = false)
		  .subscribe();
	}

}
