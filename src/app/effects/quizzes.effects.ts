import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as quizzes from '../actions/quizzes.actions';
import { Observable } from 'rxjs';
import { QuizzesService } from '../services';
import { Quiz } from '../models';

@Injectable()
export class QuizzesEffects {
	constructor(private actions$: Actions,
	            private quizzesService: QuizzesService) {
	}

	@Effect()
	loadQuizzes$: Observable<Action> = this.actions$
	  .ofType(quizzes.ActionTypes.LOAD)
	  .switchMap(() =>
		this.quizzesService.get()
		  .map((results: Quiz[]) => new quizzes.LoadSuccessAction(results))
		  .catch(error => {
			  console.log(error);
			  return Observable.of(new quizzes.LoadFailAction())
		  })
	  );
}
