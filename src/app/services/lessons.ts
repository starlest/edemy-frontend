import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Lesson} from '../models/lesson';


@Injectable()
export class LessonsService {
  private API_PATH: string = '';

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

  constructor(private http: Http) {
  }

  retrieveLessons(): Observable<Lesson[]> {
    return Observable.of(this.lessons);
  }
}
