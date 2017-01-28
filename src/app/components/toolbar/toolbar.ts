import {
  Component, Output, EventEmitter, ChangeDetectionStrategy, Input
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import {go} from '@ngrx/router-store';
import {AuthService} from '../../services/auth';
import * as auth from '../../actions/auth';

@Component({
  selector: 'ed-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.scss']
})
export class ToolbarComponent {
  title$: Observable<string>;
  isLoggedIn$: Observable<boolean>;

  @Input() menuButtonHidden = false;
  @Output() openMenu = new EventEmitter();
  @Output() openUserMenu = new EventEmitter();

  constructor(private store: Store<fromRoot.State>,
              private authService: AuthService) {
    this.authService.setAuth(null);
    this.title$ = store.select(fromRoot.getTitle);
    this.isLoggedIn$ =
      store.select(fromRoot.getAuthEntity).map(entity => !!entity);
  }

  goLoginPage() {
    this.store.dispatch(go(['/login']));
  }

  performLogout() {
    // logs out the user, then redirects him to Home View.
    this.store.dispatch(new auth.RemoveAction);
  }
}
