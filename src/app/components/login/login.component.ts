import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import * as auth from '../../actions/auth.actions';
import * as layout from '../../actions/layout.actions';
import * as fromRoot from '../../reducers';

@Component({
	selector: 'ed-login',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	submitted$: Observable<boolean>;
	loginError$: Observable<boolean>;

	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder) {
		this.submitted$ = this.store.select(fromRoot.getAuthLoading);
		this.loginError$ =
		  this.store.select(fromRoot.getAuthLoaded)
			.filter(loaded => loaded)
			.switchMap(() => {
				return this.store.select(fromRoot.getAuthEntity)
				  .map(entity => !entity);
			});
		this.loginForm = fb.group({
			username: ['', Validators.required],
			password: ['', Validators.required],
			rememberUser: [false]
		});
	}

	ngOnInit() {
		this.store.dispatch(new layout.ChangeTitleAction('Login'));
	}

	performLogin() {
		const username = this.loginForm.value.username;
		const password = this.loginForm.value.password;
		const rememberUser = this.loginForm.value.rememberUser;
		this.store.dispatch(
		  new auth.LoadFromServerAction({
			  username: username, password: password, rememberUser: rememberUser
		  }));
	}
}
