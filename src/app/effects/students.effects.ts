import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentsService } from '../services';
import { Student } from '../models';
import { go } from '@ngrx/router-store';
import * as students from '../actions/students.action';
import * as fromRoot from '../reducers';

@Injectable()
export class StudentsEffects {
	constructor(private store: Store<fromRoot.State>,
	            private actions$: Actions,
	            private studentsService: StudentsService) {
	}

	@Effect()
	loadStudents$: Observable<Action> = this.actions$
	  .ofType(students.ActionTypes.LOAD)
	  .switchMap(() =>
		this.studentsService.get()
		  .map((results: Student[]) => new students.LoadSuccessAction(results))
		  .catch(error => {
			  console.log(error);
			  return Observable.of(new students.LoadFailAction())
		  })
	  );

	@Effect()
	addStudent$: Observable<Action> = this.actions$
	  .ofType(students.ActionTypes.ADD)
	  .map((action: students.AddAction) => action.payload)
	  .switchMap(student => {
		  return this.studentsService.add(student)
			.map(student => {
				alert('Student has been successfully created.');
				this.store.dispatch(
				  go(['/admin-dashboard/students', student.Id]));
				return new students.AddSuccessAction(student);
			})
			.catch(error => {
				alert('Failed to add student. Please try again later.');
				this.store.dispatch(go(['/admin-dashboard/students']));
				console.log(error);
				return Observable.of(new students.AddFailAction());
			})
	  });

	@Effect()
	editStudent$: Observable<Action> = this.actions$
	  .ofType(students.ActionTypes.EDIT)
	  .map((action: students.EditAction) => action.payload)
	  .switchMap(student => {
		  return this.studentsService.update(student)
			.map(student => {
				alert('Student has been successfully edited.');
				this.store.dispatch(
				  go(['/admin-dashboard/students', student.Id]));
				return new students.EditSuccessAction(student);
			})
			.catch(error => {
				alert('Failed to edit student. Please try again later.');
				this.store.dispatch(go(['/admin-dashboard/students']));
				console.log(error);
				return Observable.of(new students.EditFailAction());
			})
	  });
}
