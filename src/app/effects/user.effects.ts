import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { of } from 'rxjs/observable/of';
import * as fromRoot from '../reducers';
import * as auth from '../actions/auth.actions';
import * as ua from '../actions/user.actions';
import * as sa from '../actions/students.action';
import * as wa from '../actions/worksheets.actions';

@Injectable()
export class UserEffects {
	constructor(private store: Store<fromRoot.State>,
	            private userService: UserService,
	            private actions$: Actions) {
	}

	@Effect()
	loadUser$: Observable<Action> = this.actions$
	  .ofType(ua.ActionTypes.LOAD)
	  .switchMap(() => {
		  return this.userService.get()
			.map(user => {
				if (user.Role === 'Administrator')
					this.store.dispatch(new sa.LoadAction());
				this.store.dispatch(new wa.LoadAction());
				return new ua.LoadSuccessAction(user);
			})
			.catch(err => {
				console.log(err);
				return of(new ua.LoadFailAction());
			})
	  });

	@Effect()
	loadUserFail$: Observable<Action> = this.actions$
	  .ofType(ua.ActionTypes.LOAD_FAIL)
	  .map(() => {
		  alert('Failed to load user. Please login again later.');
		  return new auth.RemoveAction()
	  });
}
