import {
  Component, OnInit, ChangeDetectionStrategy, OnDestroy
} from '@angular/core';
import {Store} from '@ngrx/store';
import {Lesson} from '../../models/lesson';
import {Subject} from '../../models/subject';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';
import * as lessons from '../../actions/lessons';
import {Observable} from 'rxjs';

@Component({
  selector: 'ed-online-lessons',
  templateUrl: 'online-lessons.component.html',
  styleUrls: ['online-lessons.component.scss']
})
export class OnlineLessonsComponent implements OnInit, OnDestroy {
  selectedSubjectFilter: string;
  selectedLevelFilter: string;

  lessons$: { [subject: string]: Observable<Lesson[]> } = {};

  subjects: Subject[] = [
    {
      id: 0,
      title: 'All'
    },
    {
      id: 1,
      title: 'English'
    },
    {
      id: 2,
      title: 'Mathematics'
    },
    {
      id: 3,
      title: 'Science'
    }
  ];
  levels = [
    'All',
    'Primary 3',
    'Primary 4',
    'Primary 5',
    'Secondary 4'
  ];

  constructor(private store: Store<fromRoot.State>) {
    this.store.dispatch(new lessons.LoadAction());
    this.subjects.forEach(subject => {
      if (subject.title === "All") return;
      this.lessons$[subject.title] =
        this.store.select(fromRoot.getSubjectLessons(subject.title));
    });
  }

  ngOnInit() {
    this.selectedSubjectFilter = this.subjects[0].title;
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
      'All' ? true : lesson.subject === this.selectedSubjectFilter) &&
      (this.selectedLevelFilter === 'All' ? true :
      lesson.level === this.selectedLevelFilter)));
  }

  ngOnDestroy() {
    this.store.dispatch(new lessons.RemoveFilter);
  }
}
