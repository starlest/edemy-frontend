import {
	Component, Output, EventEmitter, ChangeDetectionStrategy, Input
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import { go } from '@ngrx/router-store';
import * as auth from '../../actions/auth.actions';
import { User } from '../../models/user';

@Component({
	selector: 'ed-toolbar',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
	title$: Observable<string>;
	isLoggedIn$: Observable<boolean>;
	user$: Observable<User>;

	@Input() menuButtonHidden = false;
	@Output() openMenu = new EventEmitter();
	@Output() openUserMenu = new EventEmitter();

	constructor(private store: Store<fromRoot.State>) {
		this.title$ = store.select(fromRoot.getTitle);
		this.isLoggedIn$ =
		  store.select(fromRoot.getAuthEntity).map(entity => !!entity);
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

	goLoginPage() {
		this.store.dispatch(go(['/login']));
	}

	performLogout() {
		// logs out the user, then redirects him to Home View.
		this.store.dispatch(new auth.RemoveAction);
	}
}
