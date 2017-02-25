import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { School, Student } from '../../../models';
import * as fromRoot from '../../../reducers';
import * as sa from '../../../actions/students.action';


@Component({
	selector: 'ed-admin-student-add',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'admin-student-add.component.html',
	styleUrls: ['admin-student-add.component.scss']
})
export class AdminStudentAddComponent {
	studentRegistrationForm: FormGroup;
	schools$: Observable<Array<School>>;

	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder) {
		this.studentRegistrationForm = this.fb.group({
			FirstName: ['', Validators.required],
			MiddleName: [''],
			LastName: ['', Validators.required],
			Email: ['', Validators.required],
			NRIC: ['', Validators.required],
			BirthDate: ['', Validators.required],
			Gender: ['', Validators.required],
			Race: ['', Validators.required],
			Address: ['', Validators.required],
			ContactHome: ['', Validators.required],
			ContactMobile: [''],
			School: ['', Validators.required]
		});

		this.schools$ = this.store.select(fromRoot.getSchools);
	}

	addStudent() {
		const student: Student = {
			Id: 0,
			IdentificationNumber: this.studentRegistrationForm.value.NRIC,
			FirstName: this.studentRegistrationForm.value.FirstName,
			MiddleName: this.studentRegistrationForm.value.MiddleName,
			LastName: this.studentRegistrationForm.value.LastName,
			Email: this.studentRegistrationForm.value.Email,
			BirthDate: this.studentRegistrationForm.value.BirthDate,
			IsMale: this.studentRegistrationForm.value.Gender === 'male',
			Race: this.studentRegistrationForm.value.Race,
			Address: this.studentRegistrationForm.value.Address,
			ContactHome: this.studentRegistrationForm.value.ContactHome,
			ContactMobile: this.studentRegistrationForm.value.ContactMobile,
			School: this.studentRegistrationForm.value.School,
		};
		console.log(student);
		this.store.dispatch(new sa.AddAction(student));
	}
}
