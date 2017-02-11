import { Component } from '@angular/core';
import {
	FormGroup, FormBuilder, Validators, AbstractControl
} from '@angular/forms';
import { MessagesService } from '../../services/';

@Component({
	selector: 'ed-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
	contactForm: FormGroup;
	captchaControl: AbstractControl;
	submitted: boolean = false;
	messageSent: boolean = null;

	constructor(private fb: FormBuilder,
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

	sendCustomerQuery() {
		if (!this.contactForm.valid) return;
		this.submitted = true;
		this.messagesService.postQuery(this.contactForm.value)
		  .map(() => {
			  this.messageSent = true;
			  this.contactForm.reset();
		  })
		  .catch(err => {
			  this.messageSent = false;
			  console.log(err)
		  })
		  .do(() => this.submitted = false)
		  .subscribe();
	}
}
