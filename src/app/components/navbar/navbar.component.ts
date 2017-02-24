import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import * as auth from '../../actions/auth.actions';
import { User } from '../../models/user';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
	selector: 'ed-navbar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
	@ViewChild('loginModal') loginModal: ModalDirective;

	isNavbarCollapsed: boolean = true;
	isUserMenuCollapsed: boolean = true;

	routerPath$: Observable<string>;
	isLoggedIn$: Observable<boolean>;
	user$: Observable<User>;

	links: Array<any> = [
		{
			Title: 'Home',
			Route: 'home',
		},
		{
			Title: 'About',
			Route: 'about',
		},
		{
			Title: 'Curriculum',
			Route: 'curriculum',
		},
		{
			Title: 'Online Lessons',
			Route: 'online-lessons',
		},
		{
			Title: 'Contact',
			Route: 'contact',
		}
	];

	constructor(private store: Store<fromRoot.State>) {
		this.routerPath$ = store.select(fromRoot.getRouterPath).map(path => path.split('/')[1]);
		this.isLoggedIn$ =
		  store.select(fromRoot.getAuthEntity).map(entity => {
			  if (!!entity) this.loginModal.hide();
			  return !!entity;
		  });
		this.user$ = store.select(fromRoot.getUserEntity).map(entity => {
			if (entity == null) {
				const emptyUser: User = {
					Id: null,
					UserName: '',
					DisplayName: '',
					Role: ''
				};
				return emptyUser;
			}
			return entity;
		});
	}

	toggleUserMenu() {
		this.isUserMenuCollapsed = !this.isUserMenuCollapsed;
	}

	toggleNavbarCollapse() {
		this.isNavbarCollapsed = !this.isNavbarCollapsed;
	}

	closeAllCollapses() {
		this.isNavbarCollapsed = true;
		this.isUserMenuCollapsed = true;
	}

	logout() {
		this.store.dispatch(new auth.RemoveAction);
		this.closeAllCollapses();
	}
}
