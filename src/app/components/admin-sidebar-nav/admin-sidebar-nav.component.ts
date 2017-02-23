import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
	selector: 'ed-admin-sidebar-nav',
	templateUrl: 'admin-sidebar-nav.component.html',
	styleUrls: ['admin-sidebar-nav.component.scss']
})
export class AdminSidebarNavComponent {

	constructor(private store: Store<fromRoot.State>) {
	}
}
