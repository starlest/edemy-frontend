import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import {Component, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subscription} from 'rxjs/Subscription';
import * as fromRoot from '../reducers';
import * as lessons from '../actions/lessons';

@Component({
  selector: 'ed-view-lesson-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ed-selected-lesson-page></ed-selected-lesson-page>
  `
})
export class ViewLessonPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(private store: Store<fromRoot.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .select<string>('Id')
      .map(id => new lessons.SelectAction(id))
      .subscribe(store);
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
