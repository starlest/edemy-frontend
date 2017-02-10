import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as subjects from '../actions/subjects.actions';
import { of } from 'rxjs/observable/of';
import { SubjectsService } from '../services/subjects.service';
import { Subject } from '../models/subject';

@Injectable()
export class SubjectsEffects {
	constructor(private actions$: Actions,
	            private subjectsService: SubjectsService) {
	}

	@Effect()
	loadSubjects$: Observable<Action> = this.actions$
	  .ofType(subjects.ActionTypes.LOAD)
	  .startWith(new subjects.LoadAction())
	  .switchMap(() =>
		this.subjectsService.get()
		  .map((results: Subject[]) => new subjects.LoadSuccessAction(results))
		  .catch(error => {
			  console.log(error);
			  return of(new subjects.LoadFailAction());
		  })
	  );
}
