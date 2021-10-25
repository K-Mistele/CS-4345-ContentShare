import {Request, Response, Router, NextFunction} from "express";
import { IBookReview } from '../../interfaces/bookReview';
import { IMovieReview} from "../../interfaces/movieReview";
import {validateSchema} from "../services/requestValidation.service";
import {
	bookReviewCreationSchema,
	movieReviewCreationSchema,
	bookReviewDeletionSchema,
	IBookDeletionRequest
} from "../schemas/review.schemas";
import * as jwtService from '../services/jwt.service';
import * as reviewService from '../services/review.service';
import {getUserFromRequest} from "../services/user.service";
import {IAuthUser, IUser} from "../../interfaces/user";

const router: Router = Router();

// /review/book
router.put('/book', validateSchema(bookReviewCreationSchema), jwtService.requireJWT, createBookReview);
router.delete('/book', validateSchema(bookReviewDeletionSchema), jwtService.requireJWT, deleteBookReview);
// /review/movie
router.put('/movie', validateSchema(movieReviewCreationSchema), jwtService.requireJWT, createMovieReview);

module.exports = router;

/** create a book review */
async function createBookReview(request: Request, response: Response, next: NextFunction) {
	console.log(`received request to create a book review: `)
	console.log(request.body);
	// this is safe because the request has already been validated against the schema
	const bookReviewToCreate = <IBookReview> request.body;
	const userUUID: string = (<IAuthUser>request.user).uuid;
	bookReviewToCreate.reviewAuthorUUID = userUUID;

	// add the uuid from the user's JWT payload, no need to fetch the entire user since it's not required here
	const reviewAlreadyExists: boolean = await reviewService.bookReviewExists(userUUID, bookReviewToCreate.reviewTitle)
	if (reviewAlreadyExists) {
		return response.status(409).json({message: "This review already exists for this user!"});
	}
	const newReview = await reviewService.createBookReview(bookReviewToCreate);
	return response.status(200).json(newReview)

}

/** delete a book review */
async function deleteBookReview(request: Request, response: Response, next: NextFunction) {

	const userUUID = (<IAuthUser> request.user).uuid;
	const bookDeletionRequest: IBookDeletionRequest = <IBookDeletionRequest> request.body;
	const numDeleted = await reviewService.deleteBookReview(userUUID, request.body.bookTitle);
	if (numDeleted == 0) {
		return response.sendStatus(404);
	}
	return response.status(200).json({
		message: `Deleted ${numDeleted} records`
	});


}
/** creaste a movie review */
async function createMovieReview(request: Request, response: Response, next: NextFunction) {

}

