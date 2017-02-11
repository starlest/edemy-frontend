import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as worksheets from '../../actions/worksheets.actions';

@Component({
	selector: 'ed-worksheets',
	templateUrl: './worksheets.component.html',
	styleUrls: ['./worksheets.component.scss']
})
export class WorksheetsComponent {

	constructor(private store: Store<fromRoot.State>) {
	}

	ngOnInit() {
		this.store.dispatch(new worksheets.LoadAction());
	}
}
