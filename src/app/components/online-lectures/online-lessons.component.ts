import {
  Component, OnInit, AfterViewInit, ElementRef, ViewChild, Renderer
} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout';
import {Lesson} from '../../models/lesson';
import {Subject} from '../../models/subject';

@Component({
  selector: 'ed-online-lessons',
  templateUrl: 'online-lessons.component.html',
  styleUrls: ['online-lessons.component.scss']
})
export class OnlineLessonsComponent implements OnInit, AfterViewInit {
  @ViewChild('defaultSubjectFilter') subjectFilterAllOption: ElementRef;
  @ViewChild('defaultLevelFilter') levelFilterAllOption: ElementRef;

  foods = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'}
  ];

  subjects: [Subject] = [
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
      description: 'Advanced trigometry',
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

  constructor(private store: Store<fromRoot.State>,
              private renderer: Renderer) {
  }

  ngOnInit() {
    this.store.dispatch(new layout.ChangeTitleAction('Online Lessons'));
  }

  ngAfterViewInit() {
    this.renderer.invokeElementMethod(this.subjectFilterAllOption, 'select');
    this.renderer.invokeElementMethod(this.levelFilterAllOption, 'select');
  }

  getSubjectLessons(subject: string): Lesson[] {
    return this.lessons.filter(lesson => lesson.subject === subject);
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
}
