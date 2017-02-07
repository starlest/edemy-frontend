import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'ed-curriculum',
	templateUrl: './curriculum.component.html',
	styleUrls: ['./curriculum.component.scss']
})
export class CurriculumComponent implements OnInit {

	constructor(private store: Store<fromRoot.State>) {
	}

	ngOnInit() {
		this.store.dispatch(new layout.ChangeTitleAction('Curriculum'));
	}
}
