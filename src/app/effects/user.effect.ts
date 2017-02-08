import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import * as fromRoot from '../reducers';
import * as auth from '../actions/auth.actions';
import * as user from '../actions/user.actions';
import { of } from 'rxjs/observable/of';

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
			.map(result => new user.LoadSuccessAction(result))
			.catch(err => {
				console.log(err);
				return of(new user.LoadFailAction());
			})
	  });

	@Effect()
	loadUserFail$: Observable<Action> = this.actions$
	  .ofType(user.ActionTypes.LOAD_FAIL)
	  .map(() =>  {
		alert('Failed to load user. Please login again later.');
		return new auth.RemoveAction()
	  });
}
