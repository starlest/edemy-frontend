import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Store } from '@ngrx/store';
import * as fromRoot from './reducers';
import { AuthEntity } from './models/auth-entity';

@Injectable()
export class AuthHttp {
	http: Http;
	authEntity: AuthEntity;

	constructor(http: Http, private store: Store<fromRoot.State>) {
		this.http = http;
		this.store.select(fromRoot.getAuthEntity)
		  .map(entity => {
			  console.log('authHttp token:', entity);
			  this.authEntity = entity;
		  }).subscribe();
	}

	get(url, opts = {}) {
		this.configureAuth(opts);
		return this.http.get(url, opts);
	}

	post(url, data, opts = {}) {
		if (!!data && !data.includes('refresh_token'))
			this.configureAuth(opts);
		return this.http.post(url, data, opts);
	}

	put(url, data, opts = {}) {
		this.configureAuth(opts);
		return this.http.put(url, data, opts);
	}

	delete(url, opts = {}) {
		this.configureAuth(opts);
		return this.http.delete(url, opts);
	}

	configureAuth(opts: any) {
		const accessToken = this.authEntity ? this.authEntity.access_token : null;
		if (accessToken && accessToken) {
			if (!opts.headers) opts.headers = new Headers();
			opts.headers.set('Authorization',
			  `Bearer ${accessToken}`);
		}
	}
}
