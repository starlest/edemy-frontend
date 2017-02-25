import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Student } from '../../../models';
import * as fromRoot from '../../../reducers';


@Component({
	selector: 'ed-admin-student-detail',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'admin-student-detail.component.html',
	styleUrls: ['admin-student-detail.component.scss']
})
export class AdminStudentDetailComponent {
	@Input() student: Student;

	constructor(private store: Store<fromRoot.State>) {
	}
}
