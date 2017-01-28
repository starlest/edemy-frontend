import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Store} from '@ngrx/store';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth';
import {go} from '@ngrx/router-store';
import {Observable} from 'rxjs';
import * as auth from '../../actions/auth';
import * as layout from '../../actions/layout';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'ed-login',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>,
              private fb: FormBuilder,
              private authService: AuthService) {
    this.loginError$ =
      this.store.select(fromRoot.getAuthError).map(error => !!error);
    if (this.authService.isLoggedIn())
      this.store.dispatch(go(['']));
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
