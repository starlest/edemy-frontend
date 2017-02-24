import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'ed-admin-student-add',
	templateUrl: 'admin-student-add.component.html',
	styleUrls: ['admin-student-add.component.scss']
})
export class AdminStudentAddComponent implements OnInit {
	studentRegistrationForm: FormGroup;

	constructor(private fb: FormBuilder) {
		this.studentRegistrationForm = this.fb.group({
			FirstName: ['', Validators.required],
			MiddleName: [''],
			LastName: ['', Validators.required],
			NRIC: ['', Validators.required],
			BirthDate: ['', Validators.required],
			Race: ['', Validators.required],
			Address: ['', Validators.required],
			ContactHome: ['', Validators.required],
			ContactMobile: ['']
		});
	}

	ngOnInit() {

	}

	addStudent() {
		console.log(this.studentRegistrationForm.value);
	}
}
