import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Lesson } from '../../models/lesson';
import * as fromRoot from '../../reducers';
import * as lessons from '../../actions/lessons.actions';
import { Observable, Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Subject } from '../../models/';

@Component({
	selector: 'ed-online-lessons',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './online-lessons.component.html',
	styleUrls: ['./online-lessons.component.scss']
})
export class OnlineLessonsComponent implements OnDestroy {
	subjectFilter: string;
	levelFilter: string;
	subjects: string[] = [];
	levels: string[] = [];

	levelsSubscription: Subscription;
	subjects$: Observable<Subject[]>;
	lessons$: { [subject: string]: Observable<Lesson[]> } = {};

	constructor(private store: Store<fromRoot.State>) {
		this.subjects$ = this.store.select(fromRoot.getSubjects)
		  .map(subjects => {
			  this.subjects = [];
			  this.subjects.push('All');
			  subjects.forEach(subject => {
				  this.lessons$[subject.Title] = this.store.select(
					fromRoot.getFilteredSubjectLessons(subject.Title));
				  this.subjects.push(subject.Title)
			  });
			  return subjects;
		  });

		this.levelsSubscription = this.store.select(fromRoot.getLevels)
		  .map(levels => {
			  this.levels = [];
			  this.levels.push('All');
			  levels.forEach(level => this.levels.push(level.Title));
		  })
		  .subscribe();
	}

	selectedSubjectFilter(value: any): void {
		this.subjectFilter = value.text;
		this.updateDisplayedLessons();
	}

	selectedLevelFilter(value: any): void {
		this.levelFilter = value.text;
		this.updateDisplayedLessons();
	}

	updateDisplayedLessons() {
		const subjectFilterCondition: boolean = (this.subjectFilter ===
		'All' || isNullOrUndefined(this.subjectFilter));
		const levelFilterCondition: boolean = (this.levelFilter ===
		'All' || isNullOrUndefined(this.levelFilter));
		this.store.dispatch(new lessons.SetFilter((lesson: Lesson) =>
		  (subjectFilterCondition ? true :
		  lesson.Subject === this.subjectFilter) &&
		  levelFilterCondition ? true :
		  lesson.Levels.indexOf(this.levelFilter) >= 0));
	}

	getSubjectIconPath(subject: string): string {
		switch (subject) {
			case 'English':
				return 'assets/img/english.svg';
			case 'Science':
				return 'assets/img/light-bulb.svg';
			default:
				return 'assets/img/calculator.svg';
		}
	}

	ngOnDestroy() {
		this.store.dispatch(new lessons.RemoveFilter);
		if (this.levelsSubscription)
			this.levelsSubscription.unsubscribe();
	}
}
