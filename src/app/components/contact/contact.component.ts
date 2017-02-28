import { Component, ChangeDetectorRef } from '@angular/core';
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
	            private messagesService: MessagesService,
	            private ref: ChangeDetectorRef) {
		this.contactForm = fb.group({
			Name: ['', Validators.required],
			Email: ['', Validators.required],
			Phone: ['', Validators.required],
			Subject: ['', Validators.required],
			Query: ['', Validators.required],
			Captcha: ['', Validators.required]
		});
		this.captchaControl = this.contactForm.controls['Captcha'];
	}

	sendCustomerQuery() {
		if (!this.contactForm.valid) return;
		this.submitted = true;
		this.messageSent = null;
		this.messagesService.postQuery(this.contactForm.value)
		  .subscribe(() => {
			  this.contactForm.reset();
			  this.messageSent = true;
			  this.submitted = false;
		  }, err => {
			  this.messageSent = false;
			  this.submitted = false;
			  this.ref.detectChanges();
			  console.log(err);
		  });
	}
}
