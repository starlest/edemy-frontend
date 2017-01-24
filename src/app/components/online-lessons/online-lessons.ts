import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {Lesson} from '../../models/lesson';
import {Subject} from '../../models/subject';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';
import * as lessons from '../../actions/lessons';
import * as subjects from '../../actions/subjects';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'ed-online-lessons',
  templateUrl: 'online-lessons.html',
  styleUrls: ['online-lessons.scss']
})
export class OnlineLessonsComponent implements OnInit, OnDestroy {
  selectedSubjectFilter: string;
  selectedLevelFilter: string;

  lessonsSubscription: Subscription;
  subjects$: Observable<Subject[]>;
  lessons$: { [subject: string]: Observable<Lesson[]> } = {};

  // TODO: Refactor to use ngrx/store
  levels = [
    'All',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Secondary 4'
  ];

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new lessons.LoadAction());
    this.store.dispatch(new subjects.LoadAction());
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
    this.selectedSubjectFilter = "All";
    this.selectedLevelFilter = this.levels[0];
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
    this.store.dispatch(
      new lessons.SetFilter((lesson: Lesson) => (this.selectedSubjectFilter ===
      'All' ? true : lesson.Subject === this.selectedSubjectFilter) &&
      (this.selectedLevelFilter === 'All' ? true :
      lesson.Level === this.selectedLevelFilter)));
  }

  ngOnDestroy() {
    this.store.dispatch(new lessons.RemoveFilter);
    this.lessonsSubscription.unsubscribe();
  }
}