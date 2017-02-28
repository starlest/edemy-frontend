import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { School, Student } from '../../../models';
import { Subscription } from 'rxjs';
import * as sa from '../../../actions/students.action';
import * as fromRoot from '../../../reducers';

@Component({
	selector: 'ed-admin-student-edit',
	templateUrl: 'admin-student-edit.component.html',
	styleUrls: ['admin-student-edit.component.scss']
})
export class AdminStudentEditComponent implements OnDestroy {
	studentSubscription: Subscription;
	schoolsSubscription: Subscription;
	studentId: string;
	schools: Array<School>;
	submitted: boolean = false;

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

		this.schoolsSubscription = this.store.select(fromRoot.getSchools)
		  .take(1)
		  .map(schools => this.schools = schools)
		  .subscribe();

		this.studentSubscription =
		  this.store.select(fromRoot.getStudent(this.studentId))
			.take(1)
			.map(student => Object.assign(this.editedStudent, student))
			.subscribe();
	}

	editStudent() {
		this.submitted = true;
		this.store.dispatch(new sa.EditAction(this.editedStudent));
	}

	ngOnDestroy() {
		if (this.studentSubscription)
			this.studentSubscription.unsubscribe();
		if (this.schoolsSubscription)
			this.schoolsSubscription.unsubscribe();
	}
}
