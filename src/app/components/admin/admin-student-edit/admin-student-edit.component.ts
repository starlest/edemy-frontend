import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Student } from '../../../models';
import { FormBuilder } from '@angular/forms';
import * as fromRoot from '../../../reducers';

@Component({
	selector: 'ed-admin-student-edit',
	templateUrl: 'admin-student-edit.component.html',
	styleUrls: ['admin-student-edit.component.scss']
})
export class AdminStudentEditComponent {
	@Input() student: Student;

	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder) {
	}
}
