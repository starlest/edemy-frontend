import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as levels from '../actions/levels';
import {of} from 'rxjs/observable/of';
import {Level} from '../models/level';
import {LevelsService} from '../services/levels';

@Injectable()
export class LevelsEffects {
  constructor(private actions$: Actions,
              private levelsService: LevelsService) {
  }

  @Effect()
  loadLevels$: Observable<Action> = this.actions$
    .ofType(levels.ActionTypes.LOAD)
    .switchMap(() =>
      this.levelsService.get()
        .map((results: Level[]) => {
          const level_all: Level = {Id: -1, Title: 'All'};
          const s = [level_all, ...results.sort()];
          return new levels.LoadSuccessAction(s);
        })
        .catch(error => of(new levels.LoadFailAction(error)))
    );
}
