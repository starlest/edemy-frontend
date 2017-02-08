import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import * as layout from '../../actions/layout.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from '../../models/subject';
import { Subscription } from 'rxjs';
import { Level } from '../../models/level';

@Component({
	selector: 'ed-upload',
	templateUrl: './upload.component.html',
	styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {
	worksheetUploadForm: FormGroup;
	result: string;

	subjects: Subject[] = [];
	selectedSubject: Subject;
	subjectSubscription$: Subscription;

	levels: Level[] = [];
	selectedLevel: Level;
	levelSubscription$: Subscription;


	constructor(private store: Store<fromRoot.State>,
	            private fb: FormBuilder) {
		this.worksheetUploadForm = fb.group({
			Title: ['', Validators.required],
			Subject: ['', Validators.required],
			Level: ['', Validators.required],
			DownloadLink: ['', Validators.required]
		});
		this.setUpSubscriptions();

	}

	setUpSubscriptions() {
		this.subjectSubscription$ =
		  this.store.select(fromRoot.getSubjects)
			.map(subjects => {
				this.subjects =
				  subjects.filter(subject => subject.Title !== 'All');
			})
			.subscribe();
		this.levelSubscription$ =
		  this.store.select(fromRoot.getLevels)
			.map(levels => {
				this.levels =
				  levels.filter(level => level.Title !== 'All');
			})
			.subscribe();
	}

	ngOnInit() {
		this.store.dispatch(new layout.ChangeTitleAction('Upload'));
	}

	ngOnDestroy() {
		if (this.subjectSubscription$)
			this.subjectSubscription$.unsubscribe();
		if (this.levelSubscription$)
			this.levelSubscription$.unsubscribe();
	}

	worksheetUpload() {

	}

}
