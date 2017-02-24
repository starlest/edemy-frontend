import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Quiz, QuizQuestionUserAnswer } from '../../models';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { back, go } from '@ngrx/router-store';
import { QuizQuestionChoice } from '../../models/quiz/quiz-question-choice';

@Component({
	selector: 'ed-quiz',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
	@Input() quiz: Quiz;

	submitted: boolean = false;
	userAnswers: {[questionId: string]: QuizQuestionUserAnswer} = {};
	results: {[questionId: string]: boolean} = {};
	totalCorrect: number = 0;

	MCQSA: string = 'Multiple Choice Single Answer';
	MCQMA: string = 'Multiple Choice Multiple Answers';
	OE: string = 'Open Ended';

	constructor(private store: Store<fromRoot.State>) {
	}

	onRadioChoiceChange(questionId: number, choiceId: number) {
		this.userAnswers[questionId] = {
			QuestionType: this.MCQSA,
			SelectedChoices: [choiceId]
		};
	}

	onCheckBoxChoiceChange(questionId: number, choiceId: number,
	                       checked: boolean) {
		if (!this.userAnswers[questionId])
			this.userAnswers[questionId] = {
				QuestionType: this.MCQMA,
				SelectedChoices: [choiceId]
			};

		else {
			if (checked)
				this.userAnswers[questionId].SelectedChoices.push(choiceId);
			else this.userAnswers[questionId].SelectedChoices =
			  this.userAnswers[questionId].SelectedChoices.filter(
				choice => choice !== choiceId);
		}
	}

	onTextInputChange(questionId, value) {
		this.userAnswers[questionId] = {
			QuestionType: this.OE,
			SelectedChoices: [value]
		};
	}

	markQuiz() {
		this.quiz.Questions.forEach(question => {
			const userAnswer = this.userAnswers[question.Id];
			const correctAnswerChoices = question.Choices.filter(
			  choice => choice.IsAnswer);
			let isUserAnswerCorrect: boolean = false;

			if (question.Type === this.MCQSA) {
				const userChoiceId = userAnswer ?
				  userAnswer.SelectedChoices[0] :
				  null;
				isUserAnswerCorrect =
				  this.markMultipleChoiceSingleAnswerQuestion(
					userChoiceId, correctAnswerChoices[0].Id);
			}

			else if (question.Type === this.MCQMA) {
				const userChoiceIds = userAnswer ? userAnswer.SelectedChoices :
				  null;
				isUserAnswerCorrect =
				  this.markMultipleChoiceMultipleAnswersQuestion(
					userChoiceIds as [number], correctAnswerChoices);
			}

			else {
				const userChoice = userAnswer ? userAnswer.SelectedChoices[0] :
				  null;
				isUserAnswerCorrect = this.markOpenEndedQuestion(userChoice,
				  correctAnswerChoices[0].Choice);
			}

			this.results[question.Id] = isUserAnswerCorrect;
			if (isUserAnswerCorrect) this.totalCorrect++;
		});
		this.submitted = true;
	}

	markMultipleChoiceSingleAnswerQuestion(userAnswerChoiceId: number,
	                                       correctAnswerChoiceId: number): boolean {
		return userAnswerChoiceId === correctAnswerChoiceId;
	}

	markMultipleChoiceMultipleAnswersQuestion(userAnswerChoiceIds: [number],
	                                          correctAnswerChoices: Array<QuizQuestionChoice>): boolean {
		if (!userAnswerChoiceIds || userAnswerChoiceIds.length !==
		  correctAnswerChoices.length) return false;
		return correctAnswerChoices.every(
		  correctAnswerChoice => userAnswerChoiceIds.indexOf(
			correctAnswerChoice.Id) > -1);
	}

	markOpenEndedQuestion(userAnswer: string, correctAnswer: string): boolean {
		return userAnswer === correctAnswer;
	}

	goBack() {
		this.store.dispatch(go(['/quizzes']));
	}

	resetQuiz() {
		this.results = {};
		this.submitted = false;
		this.totalCorrect = 0;
	}
}
