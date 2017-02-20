import * as fromRoot from '../reducers';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { go } from '@ngrx/router-store';


@Injectable()
export class QuizExistsGuard implements CanActivate {
	constructor(private store: Store<fromRoot.State>) {
	}

	/**
	 * This method creates an observable that waits for the `loaded` property
	 * of the quizzes state to turn `true`, emitting one time once loading
	 * has finished.
	 */
	waitForCollectionToLoad(): Observable<boolean> {
		return this.store.select(fromRoot.getQuizzesLoaded)
		  .filter((loaded: boolean) => loaded)
		  .take(1);
	}

	/**
	 * This method checks if a quiz with the given ID is present in the Store
	 */
	hasQuizInStore(id: string): Observable<boolean> {
		return this.store.select(fromRoot.getQuizEntities)
		  .take(1)
		  .map(entities => {
			  if (!entities || !entities[id]) {
				  this.store.dispatch(go(['404']));
				  return false;
			  }
			  return true;
		  });
	}

	canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
		return this.waitForCollectionToLoad()
		  .switchMap(() => this.hasQuizInStore(route.params['Id']));
	}
}
