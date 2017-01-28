import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';
import {AuthService} from '../services/auth';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {go} from '@ngrx/router-store';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private store: Store<fromRoot.State>,
              private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    if (isLoggedIn) this.store.dispatch(go(['home']));
    return isLoggedIn;
  }

  canActivate(): Observable<boolean> {
    return of(!this.isLoggedIn());
  }
}
