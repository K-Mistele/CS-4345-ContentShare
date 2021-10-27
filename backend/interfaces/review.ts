import {IVertex} from "./_vertex";

export interface IReview extends IVertex {
	reviewTitle: string
	reviewText: string
	reviewRating: number
	reviewImgUrl: string
	reviewAuthorUUID: string
}