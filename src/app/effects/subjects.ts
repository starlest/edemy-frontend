import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {Action} from '@ngrx/store';
import * as subjects from '../actions/subjects';
import {of} from 'rxjs/observable/of';
import {SubjectsService} from '../services/subjects';
import {Subject} from '../models/subject';

@Injectable()
export class SubjectsEffects {
  constructor(private actions$: Actions,
              private subjectsService: SubjectsService) {
  }

  @Effect()
  loadSubjects$: Observable<Action> = this.actions$
    .ofType(subjects.ActionTypes.LOAD)
    .switchMap(() =>
      this.subjectsService.get()
        .map((results: Subject[]) => {
          const subject_all: Subject = {Id: -1, Title: 'All'};
          const s = [subject_all, ...results.sort()];
          return new subjects.LoadSuccessAction(s);
        })
        .catch(error => of(new subjects.LoadFailAction(error)))
    );
}
