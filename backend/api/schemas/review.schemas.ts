import * as Joi from 'joi';

/** the schema for creating a book review */
export const bookReviewCreationSchema = Joi.object({
	bookTitle: Joi.string().required(),
	bookAuthor: Joi.string().required(),
	reviewTitle: Joi.string().required(),
	reviewText: Joi.string().required(),
	reviewRating: Joi.number().min(0).max(5).required(),
	reviewImgUrl: Joi.string()
	//reviewAuthorUUID: Joi.string().required() // uuid
});

/** the schema for creating a movie review */
export const movieReviewCreationSchema = Joi.object({
	movieTitle: Joi.string().required(),
	reviewTitle: Joi.string().required(),
	reviewText: Joi.string().required(),
	reviewRating: Joi.number().min(0).max(5).required(),
	reviewImgUrl: Joi.string()
	//reviewAuthorUUID: Joi.string().required()
});

/** the schema for deleting a book review */
export const bookReviewDeletionSchema = Joi.object({
	reviewTitle: Joi.string().required()
})

export interface IBookDeletionRequest {
	reviewTitle: string
}

/** the schema for deleting a movie review */
export const movieReviewDeletionSchema = Joi.object({
	reviewTitle: Joi.string().required()
})
export interface IMovieDeletionRequest {
	reviewTitle: string
}

/** the schema for updating a movie review */
export const movieReviewUpdateSchema = Joi.object ({
	movieTitle: Joi.string(),
	reviewTitle: Joi.string(),
	reviewText: Joi.string(),
	reviewRating: Joi.number().min(0).max(5),
	reviewImgUrl: Joi.string(),
	'@rid': Joi.string().required()
})
export interface IMovieReviewUpdateRequest {
	movieTitle?: string
	reviewTitle?: string
	reviewText?: string
	reviewRating?: number
	reviewImgUrl?: string
	'@rid'?: string
}

/** The schema for updating a book review */
export const bookReviewUpdateSchema = Joi.object ({
	bookTitle: Joi.string(),
	bookAuthor: Joi.string(),
	reviewTitle: Joi.string(),
	reviewText: Joi.string(),
	reviewRating: Joi.number().min(0).max(5),
	reviewImgUrl: Joi.string(),
	'@rid': Joi.string().required()
})
export interface IBookReviewUpdateRequest {
	bookTitle?: string
	bookAuthor?: string
	reviewTitle?: string
	reviewText?: string
	reviewRating?: number
	reviewImgUrl?: string
	'@rid'?: string
}