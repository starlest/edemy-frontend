import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';

@Component({
  selector: "ed-not-found-page",
  template: `
      <h1 class="error">
        ERROR 404: Ooops... There is nothing here! <i class="fa fa-frown-o"
                                           aria-hidden="true"></i>
      </h1>
`,
  styles: [
    `
      .error {
          text-align: center;
          margin-top: 50px;
      }
`
  ]
})
export class NotFoundPageComponent implements OnInit {
  constructor(private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.store.dispatch(new layout.ChangeTitleAction('ERROR: 404'));
  }
}
