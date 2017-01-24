import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'ed-online-lesson',
  templateUrl: 'online-lesson.component.html',
  styleUrls: ['online-lesson.component.scss']
})
export class OnlineLessonComponent implements OnInit {

  constructor(private store: Store<fromRoot.State>,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.params["Id"];
    this.store.dispatch(new layout.ChangeTitleAction('Online Lessons' + id));
  }
}
