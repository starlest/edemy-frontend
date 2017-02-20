import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Quiz } from '../../models/quiz/quiz';

@Component({
	selector: 'ed-quiz',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
	@Input() quiz: Quiz;

	constructor() {
	}
}
