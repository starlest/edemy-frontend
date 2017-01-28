import {Component, OnInit, ChangeDetectorRef, Input} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth';
import {go} from '@ngrx/router-store';

@Component({
  selector: 'ed-login',
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError: boolean;

  constructor(private store: Store<fromRoot.State>,
              private fb: FormBuilder,
              private authService: AuthService,
              private ref: ChangeDetectorRef) {
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

  performLogin(e) {
    e.preventDefault();
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    const rememberUser = this.loginForm.value.rememberUser;
    this.authService.login(username, password, rememberUser).subscribe((data) => {
        // login successful
        this.loginError = false;
        const auth = this.authService.getAuth();
        alert('Our Token is: ' + auth.access_token);
        this.store.dispatch(go(['']));
      },
      err => {
        console.log(err);
        // login failure
        this.loginError = true;
        this.ref.detectChanges();
      });
  }
}
