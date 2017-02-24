import { Component, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Student } from '../../../models';
import * as sa from '../../../actions/students.action';
import * as fromRoot from '../../../reducers';

@Component({
	selector: 'ed-admin-student-edit',
	templateUrl: 'admin-student-edit.component.html',
	styleUrls: ['admin-student-edit.component.scss']
})
export class AdminStudentEditComponent {

	constructor(private store: Store<fromRoot.State>) {
	}
}
