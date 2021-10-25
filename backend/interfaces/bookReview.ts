import {IReview} from "./review";

export interface IBookReview extends IReview {
	bookTitle: string
	bookAuthor: string
}