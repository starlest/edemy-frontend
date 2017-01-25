import {Component, ChangeDetectionStrategy, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';
import {Lesson} from '../../models/lesson';
import {SafeResourceUrl, DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'ed-online-lesson',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'online-lesson.html',
  styleUrls: ['online-lesson.scss']
})
export class OnlineLessonComponent implements OnInit {
  @Input() lesson: Lesson;

  constructor(private store: Store<fromRoot.State>,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.store.dispatch(
      new layout.ChangeTitleAction(this.lesson.Title));
  }

  safeVideoUrl(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.lesson.VideoLink);
  }
}