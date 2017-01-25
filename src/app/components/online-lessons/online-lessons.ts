import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Lesson} from '../../models/lesson';
import {Subject} from '../../models/subject';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';
import * as lessons from '../../actions/lessons';
import {Observable, Subscription} from 'rxjs';
import {isNullOrUndefined} from 'util';
import {Level} from '../../models/level';

@Component({
  selector: 'ed-online-lessons',
  templateUrl: 'online-lessons.html',
  styleUrls: ['online-lessons.scss']
})
export class OnlineLessonsComponent implements OnInit, OnDestroy {
  selectedSubjectFilter: string;
  selectedLevelFilter: string;

  lessonsSubscription: Subscription;
  levels$: Observable<Level[]>;
  subjects$: Observable<Subject[]>;
  lessons$: { [subject: string]: Observable<Lesson[]> } = {};

  constructor(private store: Store<fromRoot.State>) {
    this.levels$ = this.store.select(fromRoot.getLevels);
    this.subjects$ = this.store.select(fromRoot.getSubjects);
    this.lessonsSubscription = this.subjects$.map(subjects => {
      subjects.forEach(subject => {
        if (subject.Title === "All") return;
        this.lessons$[subject.Title] =
          this.store.select(fromRoot.getSubjectLessons(subject.Title));
      });
    }).subscribe();
  }

  ngOnInit() {
    this.store.dispatch(new layout.ChangeTitleAction('Online Lessons'));
  }

  getSubjectSymbol(subject: string): string {
    switch (subject) {
      case 'English':
        return 'text_format';
      case 'Science':
        return 'cloud';
      default:
        return 'exposure plus 1';
    }
  }

  onFilterSelectClose() {
    const subjectFilterCondition: boolean = (this.selectedSubjectFilter ===
    'All' || isNullOrUndefined(this.selectedSubjectFilter));
    const levelFilterCondition: boolean = (this.selectedLevelFilter === 'All' ||
    isNullOrUndefined(this.selectedLevelFilter));
    this.store.dispatch(new lessons.SetFilter((lesson: Lesson) =>
      (subjectFilterCondition ? true :
      lesson.Subject === this.selectedSubjectFilter) &&
      levelFilterCondition ? true : lesson.Level === this.selectedLevelFilter));
  }

  ngOnDestroy() {
    this.store.dispatch(new lessons.RemoveFilter);
    this.lessonsSubscription.unsubscribe();
  }
}
