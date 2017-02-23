import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../../reducers';

@Component({
	selector: 'ed-admin-sidebar-nav',
	templateUrl: 'admin-sidebar-nav.component.html',
	styleUrls: ['admin-sidebar-nav.component.scss']
})
export class AdminSidebarNavComponent {
	routerPath$: Observable<string>;

	links: Array<any> = [
		{
			Title: 'Overview',
			Route: 'overview',
		},
		{
			Title: 'Students',
			Route: 'students',
		}
	];

	constructor(private store: Store<fromRoot.State>) {
		this.routerPath$ = store.select(fromRoot.getRouterPath).map(path => path.split('/')[2]);
	}
}
