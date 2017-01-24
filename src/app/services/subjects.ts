import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from '../models/subject';


@Injectable()
export class SubjectsService {
  private API_PATH: string = '';

  subjects: Subject[] = [
    {
      Id: 0,
      Title: 'All'
    },
    {
      Id: 1,
      Title: 'English'
    },
    {
      Id: 2,
      Title: 'Mathematics'
    },
    {
      Id: 3,
      Title: 'Science'
    }
  ];

  constructor(private http: Http) {
  }

  retrieveSubjects(): Observable<Subject[]> {
    return Observable.of(this.subjects);
  }
}
