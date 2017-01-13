import {
  Component, NgZone, ChangeDetectionStrategy, OnInit
} from '@angular/core';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromRoot from './reducers';
import * as layout from './actions/layout';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  isSidenavLockedOpen$: Observable<boolean>;

  constructor(private store: Store<fromRoot.State>,
              private ngZone: NgZone) {
    this.isSidenavLockedOpen$ = store.select(fromRoot.isSidenavLockedOpen);
    this.setUpWindowOnResizeListener()
  }

  ngOnInit() {
    this.isSidenavLockedOpen$ = Observable.of(window.innerWidth > 1600 ? true : false);
  }

  setUpWindowOnResizeListener() {
    window.onresize = () => {
      this.ngZone.run(() => {
        if (window.innerWidth > 1600)
          this.store.dispatch(new layout.OnLockedOpenSidenavAction());
        else
          this.store.dispatch(new layout.OffLockedOpenSidenavAction());
      });
    };
  }
}
