import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as schools from '../actions/schools.actions';
import { of } from 'rxjs/observable/of';
import { SchoolsService } from '../services';
import { School } from '../models';

@Injectable()
export class SchoolsEffects {
	constructor(private actions$: Actions,
	            private schoolsService: SchoolsService) {
	}

	@Effect()
	loadSchools$: Observable<Action> = this.actions$
	  .ofType(schools.ActionTypes.LOAD)
	  .startWith(new schools.LoadAction())
	  .switchMap(() =>
		this.schoolsService.get()
		  .map((results: School[]) => new schools.LoadSuccessAction(results))
		  .catch(error => {
			  console.log(error);
			  return of(new schools.LoadFailAction());
		  })
	  );
}
