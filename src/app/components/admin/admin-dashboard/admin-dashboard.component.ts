import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../reducers';

@Component({
	selector: 'ed-admin-dashboard',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: 'admin-dashboard.component.html',
	styleUrls: ['admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
	currentDashboard$: Observable<string>;

	constructor(private store: Store<fromRoot.State>) {
		this.currentDashboard$ = this.store.select(fromRoot.getRouterPath)
		  .map(path => path.split('/')[2]);
	}
}
