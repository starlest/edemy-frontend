import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Lesson} from '../models/lesson';
import {AuthHttp} from '../auth.http';

@Injectable()
export class LessonsService {
  private API_PATH: string = '';

  lessons: Lesson[] = [
    {
      Id: 1,
      Title: 'Algebra',
      Level: 'Primary 4',
      Subject: 'Mathematics',
      Description: 'The basics of algebra',
      VideoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
      Notes: '1 + 1 = 2',
      Tutor: 'Aloysius Feng'
    },
    {
      Id: 2,
      Title: 'Trigometry',
      Level: 'Secondary 4',
      Subject: 'Mathematics',
      Description: 'Advanced Trigometry',
      VideoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
      Notes: '1 + 1 = 2',
      Tutor: 'Aloysius Feng'
    },
    {
      Id: 3,
      Title: 'Nouns',
      Level: 'Primary 3',
      Subject: 'English',
      Description: 'Mastery of nouns.',
      VideoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
      Notes: '1 + 1 = 2',
      Tutor: 'Aloysius Feng'
    },
    {
      Id: 4,
      Title: 'Reproduction',
      Level: 'Primary 5',
      Subject: 'Science',
      Description: 'The reproduction system.',
      VideoLink: 'https://www.youtube.com/embed/_UR-l3QI2nE',
      Notes: '1 + 1 = 2',
      Tutor: 'Aloysius Feng'
    }
  ];

  constructor(private http: AuthHttp) {
  }

  retrieveLessons(): Observable<Lesson[]> {
    return Observable.of(this.lessons);
  }
}
