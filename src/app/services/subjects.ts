import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Subject} from '../models/subject';
import {environment} from '../../environments/environment';
import {Lesson} from '../models/lesson';

@Injectable()
export class SubjectsService {
  private baseUrl: string = environment.apiEndpoint + 'subjects';

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

  // calls the [GET] /api/lessons Web API method to retrieve all lessons
  get() {
    return this.http.get(this.baseUrl)
      .map((response: Response) => response.json() as Subject[])
      .catch(this.handleError);
  }

  retrieveSubjects(): Observable<Subject[]> {
    return Observable.of(this.subjects);
  }

  private handleError(error: Response) {
    // output errors to the console.
    console.error(error);
    return Observable.throw(error.json().error || "Server error");
  }
}
