import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { of } from 'rxjs/observable/of';
import * as fromRoot from '../reducers';
import * as auth from '../actions/auth.actions';
import * as user from '../actions/user.actions';
import * as quizzes from '../actions/quizzes.actions';
import * as worksheets from '../actions/worksheets.actions';

@Injectable()
export class UserEffects {
	constructor(private store: Store<fromRoot.State>,
	            private userService: UserService,
	            private actions$: Actions) {
	}

	@Effect()
	loadUser$: Observable<Action> = this.actions$
	  .ofType(user.ActionTypes.LOAD)
	  .switchMap(() => {
		  return this.userService.get()
			.map(result => {
				this.store.dispatch(new quizzes.LoadAction());
				this.store.dispatch(new worksheets.LoadAction());
				return new user.LoadSuccessAction(result);
			})
			.catch(err => {
				console.log(err);
				return of(new user.LoadFailAction());
			})
	  });


	@Effect()
	loadUserSuccess$: Observable<Action> = this.actions$
	  .ofType(user.ActionTypes.LOAD_SUCCESS)
	  .map(() => new auth.ScheduleRefreshAction);

	@Effect()
	loadUserFail$: Observable<Action> = this.actions$
	  .ofType(user.ActionTypes.LOAD_FAIL)
	  .map(() =>  {
		alert('Failed to load user. Please login again later.');
		return new auth.RemoveAction()
	  });
}
