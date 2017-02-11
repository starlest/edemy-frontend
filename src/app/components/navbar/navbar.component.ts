import {
	Component, Output, EventEmitter, ChangeDetectionStrategy, Input, ViewChild
} from '@angular/core';
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
	isCollapsed: boolean = true;
	isLoggedIn$: Observable<boolean>;
	user$: Observable<User>;

	@Input() menuButtonHidden = false;
	@Output() openMenu = new EventEmitter();
	@Output() openUserMenu = new EventEmitter();

	@ViewChild('loginModal') loginModal: ModalDirective;

	constructor(private store: Store<fromRoot.State>) {
		this.isLoggedIn$ =
		  store.select(fromRoot.getAuthEntity).map(entity => {
			  this.loginModal.hide();
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

	logout() {
		this.store.dispatch(new auth.RemoveAction);
		this.isCollapsed = true;
	}
}
