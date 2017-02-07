import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout.actions';
import {
	FormGroup, FormBuilder, Validators, AbstractControl
} from '@angular/forms';

@Component({
	selector: 'ed-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
	contactForm: FormGroup;
	captchaControl: AbstractControl;

	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder) {
		this.contactForm = fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required],
			query: ['', Validators.required],
			captcha: ['', Validators.required]
		});

		this.captchaControl = this.contactForm.controls['captcha'];
	}

	ngOnInit() {
		this.store.dispatch(new layout.ChangeTitleAction('Contact'));
	}

	sendCustomerQuery() {
		console.log(this.contactForm.value.captcha);
	}
}
