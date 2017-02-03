import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as lessons from '../actions/lessons.actions';
import {Lesson} from '../models/lesson';
import {of} from 'rxjs/observable/of';
import {LessonsService} from '../services/lessons.service';

@Injectable()
export class LessonsEffects {
  constructor(private actions$: Actions,
              private lessonsService: LessonsService) {
  }

  @Effect()
  loadLessons$: Observable<Action> = this.actions$
    .ofType(lessons.ActionTypes.LOAD)
    .startWith(new lessons.LoadAction())
    .switchMap(() =>
      this.lessonsService.get()
        .map((results: Lesson[]) => new lessons.LoadSuccessAction(results))
        .catch(error => of(new lessons.LoadFailAction(error)))
    );
}
