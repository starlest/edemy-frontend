import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { School, Student } from '../../../models';
import { Observable, Subscription } from 'rxjs';
import * as sa from '../../../actions/students.action';
import * as fromRoot from '../../../reducers';

@Component({
	selector: 'ed-admin-student-edit',
	templateUrl: 'admin-student-edit.component.html',
	styleUrls: ['admin-student-edit.component.scss']
})
export class AdminStudentEditComponent implements OnDestroy {
	studentSubscription: Subscription;
	schools$: Observable<Array<School>>;
	studentId: string;

	// Initialise initial values to prevent template errors
	editedStudent: Student = {
		Id: -1,
		IdentificationNumber: '',
		FirstName: '',
		MiddleName: '',
		LastName: '',
		Race: '',
		Address: '',
		Email: '',
		BirthDate: '',
		IsMale: false,
		ContactHome: '',
		ContactMobile: '',
		School: ''
	};

	constructor(private store: Store<fromRoot.State>,
	            private route: ActivatedRoute) {
		this.studentId = this.route.snapshot.params['Id'];
		this.schools$ = this.store.select(fromRoot.getSchools);
		this.studentSubscription =
		  this.store.select(fromRoot.getStudent(this.studentId))
		    .take(1)
			.map(student => Object.assign(this.editedStudent, student))
			.subscribe();
	}

	editStudent() {
		this.store.dispatch(new sa.EditAction(this.editedStudent));
	}

	ngOnDestroy() {
		if (this.studentSubscription)
			this.studentSubscription.unsubscribe();
	}
}