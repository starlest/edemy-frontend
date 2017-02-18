import { QuizQuestionChoice } from './quiz-question-choice';

export interface QuizQuestion {
	Question: string;
	Type: string;
	Choices: QuizQuestionChoice[];
}
