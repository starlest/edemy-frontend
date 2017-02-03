import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'ed-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
	contactForm: FormGroup;

	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder) {
		this.contactForm = fb.group({
			name: ['', Validators.required],
			email: ['', Validators.required],
			phone: ['', Validators.required],
			query: ['', Validators.required],
		});
	}

	ngOnInit() {
		this.store.dispatch(new layout.ChangeTitleAction('Contact'));
	}

	sendCustomerQuery() {

	}
}
