import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { Action } from '@ngrx/store';
import * as levels from '../actions/levels.actions';
import { of } from 'rxjs/observable/of';
import { Level } from '../models/level';
import { LevelsService } from '../services/levels.service';

@Injectable()
export class LevelsEffects {
	constructor(private actions$: Actions,
	            private levelsService: LevelsService) {
	}

	@Effect()
	loadLevels$: Observable<Action> = this.actions$
	  .ofType(levels.ActionTypes.LOAD)
	  .startWith(new levels.LoadAction())
	  .switchMap(() =>
		this.levelsService.get()
		  .map((results: Level[]) => new levels.LoadSuccessAction(results))
		  .catch(error => {
			  console.log(error);
			  return of(new levels.LoadFailAction())
		  })
	  );
}
