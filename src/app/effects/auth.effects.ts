import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';
import * as auth from '../actions/auth.actions';
import * as user from '../actions/user.actions';
import * as fromRoot from '../reducers';

@Injectable()
export class AuthEffects {
	refreshSubscription: Subscription;

	constructor(private store: Store<fromRoot.State>,
	            private actions$: Actions,
	            private authService: AuthService) {
	}

	@Effect()
	loadAuthFromLocalStorage$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.LOAD_FROM_LOCAL_STORAGE)
	  .startWith(new auth.LoadFromLocalStorageAction())
	  .map(() => {
		  const authEntity = this.authService.getAuthInLocalStorage();
		  if (!authEntity) return new auth.StartupLoadFailAction();
		  return new auth.LoadSuccessAction(authEntity);
	  });


	@Effect()
	loadAuthFromServer$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.LOAD_FROM_SERVER)
	  .map((action: auth.LoadFromServerAction) => action.payload)
	  .switchMap(payload => {
		  return this.authService.login(payload.username, payload.password,
			payload.rememberUser)
			.map(result => new auth.LoadSuccessAction(result))
			.catch(err => {
				const error = err.json();
				console.log(error);
				return of(new auth.LoadFailAction());
			});
	  });

	@Effect()
	startupLoadFail$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.STARTUP_LOAD_FAIL)
	  .map(() => new user.StartupLoadFailAction());

	@Effect()
	removeAuth$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.REMOVE)
	  .switchMap(() => {
		  if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
		  return this.authService.logout()
			.map(() => new auth.RemoveSuccessAction())
			.catch(err => {
				console.log(err);
				return of(new auth.RemoveFailAction());
			})
			.do(() => this.store.dispatch(go(['/'])));
	  });

	@Effect()
	removeAuthAfter$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.REMOVE_SUCCESS || auth.ActionTypes.REMOVE_FAIL)
	  .map(() => new user.RemoveAction);

	@Effect()
	loadSuccess$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.LOAD_SUCCESS)
	  .map((action: auth.LoadSuccessAction) => new auth.ScheduleRefreshAction());

	@Effect()
	scheduleRefresh$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.SCHEDULE_REFRESH)
	  .map(() => {
		  this.authService.scheduleRefresh();
		  return new auth.ScheduleRefreshSuccessAction();
	  });

	@Effect()
	scheduleRefreshSuccess$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.SCHEDULE_REFRESH_SUCCESS)
	  .switchMap(() => {
		  return this.store.select(fromRoot.getUserEntity)
		    .take(1)
			.map(entity => {
				// load user only if the user has not been loaded before.
				if (!entity) return new user.LoadAction();
				return new user.DoNothingAction();
			});
	  });

	@Effect()
	refreshToken$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.REFRESH)
	  .switchMap(() => {
		  return this.store.select(fromRoot.getAuthEntity)
		    .take(1)
			.switchMap(authEntity => {
				return this.authService.refreshAuth(authEntity)
				  .map(result => {
					  // update local storage's auth
					  if (localStorage.getItem(environment.authKey))
						  this.authService.setAuthInLocalStorage(result);
					  return new auth.RefreshSuccessAction(result);
				  })
				  .catch(err => {
					  console.log(err);
					  return of(new auth.RefreshFailAction());
				  });
			});
	  });

	@Effect()
	refreshSuccessToken$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.REFRESH_SUCCESS)
	  .map(() => new auth.ScheduleRefreshAction());

	@Effect()
	refreshFailToken$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.REFRESH_FAIL)
	  .map(() => {
		  alert('Your session has expired. Please login again.');
		  return new auth.RemoveAction();
	  });
}
