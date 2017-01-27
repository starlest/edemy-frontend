import {Component, OnInit} from '@angular/core';
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
  loginError: boolean = false;

  constructor(private store: Store<fromRoot.State>, private fb: FormBuilder,
              private authService: AuthService) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.store.dispatch(new layout.ChangeTitleAction('Login'));
  }

  performLogin(e) {
    e.preventDefault();
    alert(JSON.stringify(this.loginForm.value));
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.authService.login(username, password).subscribe((data) => {
        // login successful
        this.loginError = false;
        const auth = this.authService.getAuth();
        alert('Our Token is: ' + auth.access_token);
        this.store.dispatch(go(['/home']));
      },
      err => {
        console.log(err);
        // login failure
        this.loginError = true;
      });
  }
}
