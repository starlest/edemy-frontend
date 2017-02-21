import { QuizQuestion } from './quiz-question';

export interface Quiz {
	Id: number;
	Title: string;
	Subject: string;
	Tutor: string;
	Levels: string[];
	Questions: QuizQuestion[];
}
