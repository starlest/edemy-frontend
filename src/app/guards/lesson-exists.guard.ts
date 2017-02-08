import * as fromRoot from '../reducers';
import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot} from '@angular/router';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {of} from 'rxjs/observable/of';
import {go} from '@ngrx/router-store';


@Injectable()
export class LessonExistsGuard implements CanActivate {
  constructor(private store: Store<fromRoot.State>) {
  }

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the lessons state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.select(fromRoot.getLessonsLoaded)
      .filter((loaded: boolean) => loaded)
      .take(1);
  }

  /**
   * This method checks if a lesson with the given ID is present in the Store
   */
  hasLessonInStore(id: string): Observable<boolean> {
    return this.store.select(fromRoot.getLessonEntities)
      .switchMap(entities => {
        const lessonExists = !!entities[id];
        if (!lessonExists) this.store.dispatch(go(['404']));
        return of(lessonExists)
      });
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad()
      .switchMap(() => this.hasLessonInStore(route.params['Id']));
  }
}
