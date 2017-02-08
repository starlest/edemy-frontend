import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {Observable} from 'rxjs';
import {go} from '@ngrx/router-store';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private store: Store<fromRoot.State>) {
  }

  canActivate(): Observable<boolean> {
    return this.store.select(fromRoot.getAuthEntity).map(entity => {
      if (!!entity) this.store.dispatch(go(['home']));
      return !entity
    });
  }
}
