import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Observable } from 'rxjs';
import { go } from '@ngrx/router-store';

@Injectable()
export class AdminGuard implements CanActivate {

	constructor(private store: Store<fromRoot.State>) {
	}


	waitForUserToLoad(): Observable<boolean> {
		return this.store.select(fromRoot.getUserLoaded)
		  .filter((loaded: boolean) => loaded)
		  .take(1);
	}

	/**
	 * This method checks if a lesson with the given ID is present in the Store
	 */
	isUserAdmin(): Observable<boolean> {
		return this.store.select(fromRoot.getUserEntity)
		  .map(entity => {
			  if (!entity) {
				  this.store.dispatch(go(['404']));
				  return false;
			  }
			  return entity.Role === 'Administrators';
		  });
	}

	canActivate(): Observable<boolean> {
		return this.waitForUserToLoad()
		  .switchMap(() => this.isUserAdmin());
	}
}
