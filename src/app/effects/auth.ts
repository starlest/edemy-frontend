import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {AuthService} from '../services/auth';
import {Observable} from 'rxjs';
import {Action, Store} from '@ngrx/store';
import * as auth from '../actions/auth';
import * as fromRoot from '../reducers';
import {go} from '@ngrx/router-store';
import {of} from 'rxjs/observable/of';

@Injectable()
export class AuthEffects {
  authKey = 'auth';

  constructor(private store: Store<fromRoot.State>,
              private actions$: Actions,
              private authService: AuthService) {
  }

  @Effect()
  loadAuthFromLocalStorage$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOAD_FROM_LOCAL_STORAGE)
    .startWith(new auth.LoadFromLocalStorageAction())
    .map(() => {
      const i = localStorage.getItem(this.authKey);
      if (i) return new auth.LoadSuccessAction(JSON.parse(i));
      return new auth.LoadNullAction();
    });

  @Effect()
  loadAuthFromServer$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.LOAD_FROM_SERVER)
    .map((action: auth.LoadFromServerAction) => action.payload)
    .switchMap(payload => {
      return this.authService.login(payload.username, payload.password,
        payload.rememberUser)
        .map(result => {
          this.store.dispatch(go(['/']));
          return new auth.LoadSuccessAction(result);
        })
        .catch(err => {
          const error = err.json();
          console.log(error);
          return of(new auth.LoadFailAction(error));
        });
    });

  @Effect()
  removeAuth$: Observable<Action> = this.actions$
    .ofType(auth.ActionTypes.REMOVE)
    .switchMap(() => {
      return this.authService.logout()
        .map(() => {
          this.store.dispatch(go(['/']));
          return new auth.RemoveSuccessAction();
        })
        .catch(err => {
          const error = err.json();
          console.log(error);
          return of(new auth.RemoveFailAction());
        });
    });
}
