import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import * as auth from '../actions/auth.actions';
import * as user from '../actions/user.actions';
import * as fromRoot from '../reducers';
import { go, back } from '@ngrx/router-store';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';
import { AuthEntity } from '../models/auth-entity';

@Injectable()
export class AuthEffects {
	refreshSubscription$: Subscription;

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

		  // Refresh auth if it is expiring in 5 minutes
		  const expiresIn = +authEntity.expiration_date - new Date().getTime();
		  const expiresInMinutes = expiresIn / 1000 / 60;
		  if (expiresInMinutes < 5) return new auth.RefreshAction(authEntity);

		  return new auth.LoadSuccessAction(authEntity);
	  });


	@Effect()
	loadAuthFromServer$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.LOAD_FROM_SERVER)
	  .map((action: auth.LoadFromServerAction) => action.payload)
	  .switchMap(payload => {
		  return this.authService.login(payload.username, payload.password,
			payload.rememberUser)
			.map(result => {
				this.store.dispatch(back());
				return new auth.LoadSuccessAction(result);
			})
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
		  if (this.refreshSubscription$) this.refreshSubscription$.unsubscribe();
		  return this.authService.logout()
			.map(() => {
				this.store.dispatch(go(['/']));
				return new auth.RemoveSuccessAction();
			})
			.catch(err => {
				console.log(err);
				return of(new auth.RemoveFailAction());
			});
	  });

	@Effect()
	loadSuccess$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.LOAD_SUCCESS)
	  .map(() => new auth.ScheduleRefreshAction());

	@Effect()
	scheduleRefresh$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.SCHEDULE_REFRESH)
	  .map(() => {

		  // Figure out the interval to refresh auth
		  const source = this.store.select(fromRoot.getAuthEntity).take(1)
			.switchMap((entity: AuthEntity) => {
				const expiresIn = +entity.expiration_date -
				  new Date().getTime();
				console.log('token expiring in (minutes):',
				  expiresIn / 1000 / 60);
				const interval = expiresIn / 2;
				console.log('refreshing in (seconds):',
				  interval / 1000);
				return Observable.interval(interval);
			});

		  // Start the scheduler
		  if (this.refreshSubscription$) this.refreshSubscription$.unsubscribe();
		  this.refreshSubscription$ =
			source.subscribe(() => {
				this.store.select(fromRoot.getAuthEntity)
				  .take(1)
				  .map(entity =>
					this.store.dispatch(new auth.RefreshAction(entity)))
				  .subscribe()
			});

		  return new auth.ScheduleRefreshSuccessAction();
	  });

	@Effect()
	scheduleRefreshSuccess$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.SCHEDULE_REFRESH_SUCCESS)
	  .map(() => new user.LoadAction());

	@Effect()
	refreshToken$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.REFRESH)
	  .switchMap((action: auth.RefreshAction) => {
		  return this.authService.refreshAuth(action.payload)
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

	@Effect()
	refreshSuccessToken$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.REFRESH_SUCCESS)
	  .map(
		(action: auth.RefreshSuccessAction) => new auth.LoadSuccessAction(action.payload));

	@Effect()
	refreshFailToken$: Observable<Action> = this.actions$
	  .ofType(auth.ActionTypes.REFRESH_FAIL)
	  .map(() => {
		  alert('Your session has expired. Please login again.');
		  return new auth.RemoveAction();
	  });
}
