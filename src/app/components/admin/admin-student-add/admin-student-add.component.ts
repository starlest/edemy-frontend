import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../../reducers';
import { Observable } from 'rxjs';
import { School } from '../../../models';

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
			NRIC: ['', Validators.required],
			BirthDate: ['', Validators.required],
			Race: ['', Validators.required],
			Address: ['', Validators.required],
			ContactHome: ['', Validators.required],
			ContactMobile: [''],
			School: ['', Validators.required]
		});

		this.schools$ = this.store.select(fromRoot.getSchools);
	}

	addStudent() {
		console.log(this.studentRegistrationForm.value);
	}
}
