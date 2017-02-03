import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout.actions';

@Component({
  selector: 'ed-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new layout.ChangeTitleAction('About'));
  }
}
