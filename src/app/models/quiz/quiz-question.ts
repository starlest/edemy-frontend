import { QuizQuestionChoice } from './quiz-question-choice';

export interface QuizQuestion {
	Id: number;
	Question: string;
	Type: string;
	Choices: QuizQuestionChoice[];
}
