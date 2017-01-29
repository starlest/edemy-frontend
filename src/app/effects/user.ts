import {Injectable} from '@angular/core';
import {Actions} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import * as fromRoot from '../reducers';

@Injectable()
export class UserEffects {
  constructor(private store: Store<fromRoot.State>,
              private actions$: Actions) {
  }

}
