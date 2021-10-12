import {IEdge} from "./_edge";

export interface IReview extends IEdge {
	by: string
	created: number // timestamp
	reviewTitle: string
	reviewText: string
	rating: number
}