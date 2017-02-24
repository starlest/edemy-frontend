import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StudentsService } from '../services';
import { Student } from '../models';
import * as students from '../actions/students.action';

@Injectable()
export class StudentsEffects {
	constructor(private actions$: Actions,
	            private studentsService: StudentsService) {
	}

	@Effect()
	loadStudents$: Observable<Action> = this.actions$
	  .ofType(students.ActionTypes.LOAD)
	  .switchMap(() =>
		  this.studentsService.get()
			.map((results: Student[]) => {
				return new students.LoadSuccessAction(results);
			})
			.catch(error => {
				console.log(error);
				return Observable.of(new students.LoadFailAction())
			})
	  );
}
