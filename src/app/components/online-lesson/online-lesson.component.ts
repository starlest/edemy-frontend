import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Lesson } from '../../models/lesson';
import {
	SafeResourceUrl, DomSanitizer, SafeHtml
} from '@angular/platform-browser';

@Component({
	selector: 'ed-online-lesson',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './online-lesson.component.html',
	styleUrls: ['./online-lesson.component.scss']
})
export class OnlineLessonComponent {
	@Input() lesson: Lesson;

	constructor(private sanitizer: DomSanitizer) {
	}

	safeVideoUrl(videoLink: string): SafeResourceUrl {
		return this.sanitizer.bypassSecurityTrustResourceUrl(videoLink);
	}


	safeNotes(): SafeHtml {
		return this.sanitizer.bypassSecurityTrustHtml(this.lesson.Notes);
	}
}
