import '@ngrx/core/add/operator/select';
import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import * as fromRoot from '../../reducers';
import * as sa from '../../actions/students.action';

@Component({
	selector: 'ed-view-admin-student-edit-page',
	changeDetection: ChangeDetectionStrategy.OnPush,
	template: `
    <ed-selected-admin-student-edit-page></ed-selected-admin-student-edit-page>
  `
})
export class ViewAdminStudentEditPageComponent implements OnDestroy {
	actionsSubscription: Subscription;

	constructor(private store: Store<fromRoot.State>, route: ActivatedRoute) {
		this.actionsSubscription = route.params
		  .select<string>('Id')
		  .map(id => new sa.SelectAction(id))
		  .subscribe(store);
	}

	ngOnDestroy() {
		this.actionsSubscription.unsubscribe();
	}
}
