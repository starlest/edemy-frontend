import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as lessons from '../actions/lessons';
import * as subjects from '../actions/subjects';
import {Lesson} from '../models/lesson';
import {of} from 'rxjs/observable/of';
import {LessonsService} from '../services/lessons';
import {SubjectsService} from '../services/subjects';
import {Subject} from '../models/subject';

@Injectable()
export class LessonsEffects {
  constructor(private actions$: Actions,
              private lessonsService: LessonsService,
              private subjectsService: SubjectsService) {
  }

  /**
   * This effect makes use of the `startWith` operator to trigger
   * the effect immediately on startup.
   */
  @Effect()
  loadLessons$: Observable<Action> = this.actions$
    .ofType(lessons.ActionTypes.LOAD)
    // .startWith(new lessons.LoadAction())
    .switchMap(() =>
      this.lessonsService.retrieveLessons()
        .map((results: Lesson[]) => new lessons.LoadSuccessAction(results))
        .catch(error => of(new lessons.LoadFailAction(error)))
    );

  @Effect()
  loadSubjects$: Observable<Action> = this.actions$
    .ofType(subjects.ActionTypes.LOAD)
    // .startWith(new lessons.LoadAction())
    .switchMap(() =>
      this.subjectsService.retrieveSubjects()
        .map((results: Subject[]) => new subjects.LoadSuccessAction(results))
        .catch(error => of(new subjects.LoadFailAction(error)))
    );
}
