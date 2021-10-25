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
	reviewBody: Joi.string().required(),
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