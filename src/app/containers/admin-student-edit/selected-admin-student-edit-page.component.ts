import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Student } from '../../models/student';
import * as fromRoot from '../../reducers';

@Component({
	selector: 'ed-selected-admin-student-edit-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ed-admin-student-edit [student]="student$ | async"></ed-admin-student-edit>
  `
})
export class SelectedAdminStudentEditPageComponent {
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
