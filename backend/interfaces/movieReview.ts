import {IReview} from "./review";

export interface IMovieReview extends IReview {
	movieTitle: string
	movieDirector: string
}