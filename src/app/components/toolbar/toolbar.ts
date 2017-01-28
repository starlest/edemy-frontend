import {
  Component, Output, EventEmitter, ChangeDetectionStrategy, Input
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers';
import {go} from '@ngrx/router-store';
import {AuthService} from '../../services/auth';

@Component({
  selector: 'ed-toolbar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'toolbar.html',
  styleUrls: ['toolbar.scss']
})
export class ToolbarComponent {
  @Input() menuButtonHidden = false;
  @Output() openMenu = new EventEmitter();
  title$: Observable<string>;

  constructor(private store: Store<fromRoot.State>,
              private authService: AuthService) {
    this.title$ = store.select(fromRoot.getTitle);
  }

  goLoginPage() {
    this.store.dispatch(go(['/login']));
  }

  logout(): boolean {
    // logs out the user, then redirects him to Welcome View.
    if (this.authService.logout())
      this.store.dispatch(go(['']));
    return false;
  }
}
