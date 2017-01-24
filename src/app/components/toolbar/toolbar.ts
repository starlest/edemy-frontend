import {
  Component, Output, EventEmitter, ChangeDetectionStrategy, Input
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../reducers';

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

  constructor(private store: Store<fromRoot.State>) {
    this.title$ = store.select(fromRoot.getTitle);
  }
}
