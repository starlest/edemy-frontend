import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Student } from '../../../models/student';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import * as fromRoot from '../../../reducers';

@Component({
	selector: 'ed-admin-student-detail',
	templateUrl: 'admin-student-details.component.html',
	styleUrls: ['admin-student-details.component.scss']
})

export class AdminStudentDetailsComponent implements OnDestroy {
	studentSubscription: Subscription;
	studentId: string;

	// Initialise initial values to prevent template errors
	student: Student = {
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
		this.studentSubscription =
		  this.store.select(fromRoot.getStudent(this.studentId))
		    .take(1)
			.map(student => Object.assign(this.student, student))
			.subscribe();
	}

	ngOnDestroy() {
		if (this.studentSubscription)
			this.studentSubscription.unsubscribe();
	}
}
