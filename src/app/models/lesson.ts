import { Video } from './video';
export interface Lesson {
	Id: number;
	Title: string;
	Levels: string[];
	Subject: string;
	Description: string;
	Notes: string;
	Tutor: string;
	Videos: Video[];
}
