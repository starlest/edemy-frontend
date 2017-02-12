import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { Observable } from 'rxjs';
import { Worksheet } from '../models';

@Component({
	selector: 'ed-worksheets-page',
	changeDetection: ChangeDetectionStrategy.OnPush,

})
export class WorksheetsPageComponent {

	constructor(private store: Store<fromRoot.State>) {

	}
}
