import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Lesson} from '../../models/lesson';
import {Subject} from '../../models/subject';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';
import * as lessons from '../../actions/lessons';
@Component({
  selector: 'ed-online-lessons',
  templateUrl: 'online-lessons.component.html',
  styleUrls: ['online-lessons.component.scss']
})
export class OnlineLessonsComponent implements OnInit {
  selectedSubjectFilter: string;
  selectedLevelFilter: string;

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

  lessons: Lesson[] = [
    {
      id: 1,
      title: 'Algebra',
      level: 'Primary 4',
      subject: 'Mathematics',
      description: 'The basics of algebra',
      videoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
      notes: '1 + 1 = 2',
      tutor: 'Aloysius Feng'
    },
    {
      id: 2,
      title: 'Trigometry',
      level: 'Secondary 4',
      subject: 'Mathematics',
      description: 'Advanced Trigometry',
      videoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
      notes: '1 + 1 = 2',
      tutor: 'Aloysius Feng'
    },
    {
      id: 3,
      title: 'Nouns',
      level: 'Primary 3',
      subject: 'English',
      description: 'Mastery of nouns.',
      videoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
      notes: '1 + 1 = 2',
      tutor: 'Aloysius Feng'
    },
    {
      id: 4,
      title: 'Reproduction',
      level: 'Primary 5',
      subject: 'Science',
      description: 'The reproduction system.',
      videoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
      notes: '1 + 1 = 2',
      tutor: 'Aloysius Feng'
    }
  ];
  displayedLessons: Lesson[];

  constructor(private store: Store<fromRoot.State>) {

    this.store.dispatch(new lessons.LoadAction());
  }

  ngOnInit() {
    this.displayedLessons = this.lessons;
    this.selectedSubjectFilter = this.subjects[0].title;
    this.selectedLevelFilter = this.levels[0];
    this.store.dispatch(new layout.ChangeTitleAction('Online Lessons'));
  }

  getSubjectLessons(subject: string): Lesson[] {
    return this.displayedLessons.filter(lesson => lesson.subject === subject);
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
    this.displayedLessons = this.lessons.filter(lesson => {
      return (this.selectedSubjectFilter === 'All' ? true :
        lesson.subject === this.selectedSubjectFilter) &&
        (this.selectedLevelFilter === 'All' ? true :
        lesson.level === this.selectedLevelFilter);
    });
  }
}
