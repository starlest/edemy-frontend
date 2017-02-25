import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Student } from '../../models/student';
import * as fromRoot from '../../reducers';

@Component({
	selector: 'ed-selected-admin-student-detail-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ed-admin-student-detail [student]="student$ | async"></ed-admin-student-detail>
  `
})
export class SelectedAdminStudentDetailPageComponent {
	student$: Observable<Student>;

	constructor(private store: Store<fromRoot.State>) {
		this.student$ =
		  store.select(fromRoot.getSelectedStudent).map(student => {
			  // Load a placeholder student first if there are no
			  // students loaded yet
			  if (!student) {
				  const emptyStudent: Student = {
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
				  return emptyStudent;
			  }
			  return student;
		  });
	}
}
