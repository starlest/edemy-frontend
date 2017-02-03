import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout.actions';

@Component({
  selector: 'ed-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new layout.ChangeTitleAction('Home'));
  }
}
