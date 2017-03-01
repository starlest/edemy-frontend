import {
	Component, ChangeDetectionStrategy, OnDestroy, OnInit
} from '@angular/core';
import { Quiz, QuizQuestionUserAnswer } from '../../models';
import { Store } from '@ngrx/store';
import { go } from '@ngrx/router-store';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { QuizQuestionChoice } from '../../models/quiz/quiz-question-choice';
import * as quizQuestionTypes from '../../models/quiz/quiz-question-types';
import * as fromRoot from '../../reducers';

@Component({
	selector: 'ed-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnDestroy {
	quizSubscription: Subscription;
	quizId: string;
	userAnswers: {[questionId: string]: QuizQuestionUserAnswer} = {};
	results: {[questionId: string]: boolean} = {};
	totalCorrect: number = 0;
	submitted: boolean = false;

	// Initialise initial values to prevent template errors
	quiz: Quiz = {
		Id: -1,
		Title: '',
		Levels: [],
		Subject: '',
		Tutor: '',
		Questions: []
	};

	constructor(private store: Store<fromRoot.State>,
	            private route: ActivatedRoute) {
		this.quizId = this.route.snapshot.params['Id'];
		this.quizSubscription =
		  this.store.select(fromRoot.getQuiz(this.quizId))
			.take(1)
			.map(quiz => Object.assign(this.quiz, quiz))
			.subscribe();
	}

	ngOnDestroy() {
		if (this.quizSubscription)
			this.quizSubscription.unsubscribe();
	}

	onRadioChoiceChange(questionId: number, choiceId: number) {
		this.userAnswers[questionId] = {
			QuestionType: quizQuestionTypes.MCQSA,
			SelectedChoices: [choiceId]
		};
	}

	onCheckBoxChoiceChange(questionId: number, choiceId: number,
	                       checked: boolean) {
		if (!this.userAnswers[questionId])
			this.userAnswers[questionId] = {
				QuestionType: quizQuestionTypes.MCQMA,
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
			QuestionType: quizQuestionTypes.OE,
			SelectedChoices: [value]
		};
	}

	markQuiz() {
		this.quiz.Questions.forEach(question => {
			const userAnswer = this.userAnswers[question.Id];
			const correctAnswerChoices = question.Choices.filter(
			  choice => choice.IsAnswer);
			let isUserAnswerCorrect: boolean = false;

			if (question.Type === quizQuestionTypes.MCQSA) {
				const userChoiceId = userAnswer ?
				  userAnswer.SelectedChoices[0] :
				  null;
				isUserAnswerCorrect =
				  this.markMultipleChoiceSingleAnswerQuestion(
					userChoiceId, correctAnswerChoices[0].Id);
			}

			else if (question.Type === quizQuestionTypes.MCQMA) {
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
