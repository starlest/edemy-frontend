import {Component, Output, EventEmitter} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'ed-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
  title$: Observable<string>;

  constructor(private store: Store<fromRoot.State>) {
    this.title$ = store.select(fromRoot.getTitle);
  }
}
