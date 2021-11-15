import {Request, Response, Router, NextFunction} from "express";
import { IBookReview } from '../../interfaces/bookReview';
import { IMovieReview} from "../../interfaces/movieReview";
import {validateSchema} from "../services/requestValidation.service";
import {
	bookReviewCreationSchema,
	movieReviewCreationSchema,
	bookReviewDeletionSchema,
	movieReviewDeletionSchema,
	IBookDeletionRequest,
	IMovieDeletionRequest,
	bookReviewUpdateSchema,
	movieReviewUpdateSchema,
	IMovieReviewUpdateRequest,
	IBookReviewUpdateRequest
} from "../schemas/review.schemas";
import * as jwtService from '../services/jwt.service';
import * as reviewService from '../services/review.service';
import {IAuthUser} from "../../interfaces/user";

const router: Router = Router();

// /review/book
router.put('/book', validateSchema(bookReviewCreationSchema), jwtService.requireJWT, createBookReview);
router.delete('/book', validateSchema(bookReviewDeletionSchema), jwtService.requireJWT, deleteBookReview);
router.patch('/book', validateSchema(bookReviewUpdateSchema), jwtService.requireJWT, editBookReview);

// /review/movie
router.put('/movie', validateSchema(movieReviewCreationSchema), jwtService.requireJWT, createMovieReview);
router.delete('/movie', validateSchema(movieReviewDeletionSchema), jwtService.requireJWT, deleteMovieReview);
router.patch('/movie', validateSchema(movieReviewUpdateSchema), jwtService.requireJWT, editMovieReview);
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
	const numDeleted = await reviewService.deleteBookReview(userUUID, bookDeletionRequest.reviewTitle);
	if (numDeleted == 0) {
		return response.sendStatus(404);
	}
	return response.status(200).json({
		message: `Deleted ${numDeleted} records`
	});
}

/** create a movie review */
async function createMovieReview(request: Request, response: Response, next: NextFunction) {
	console.log(`received request to create a movie review: `)
	console.log(request.body);
	// this is safe because the request has already been validated against the schema
	const movieReviewToCreate = <IMovieReview> request.body;
	const userUUID: string = (<IAuthUser>request.user).uuid;
	movieReviewToCreate.reviewAuthorUUID = userUUID;

	// add the uuid from the user's JWT payload, no need to fetch the entire user since it's not required here
	const reviewAlreadyExists: boolean = await reviewService.bookReviewExists(userUUID, movieReviewToCreate.reviewTitle)
	if (reviewAlreadyExists) {
		return response.status(409).json({message: "This review already exists for this user!"});
	}
	const newReview = await reviewService.createMovieReview(movieReviewToCreate);
	return response.status(200).json(newReview)

}

/** delete a movie review */
async function deleteMovieReview(request: Request, response: Response, next: NextFunction) {

	const userUUID = (<IAuthUser> request.user).uuid;
	const movieDeletionRequest: IMovieDeletionRequest = <IMovieDeletionRequest> request.body;
	const numDeleted = await reviewService.deleteMovieReview(userUUID, movieDeletionRequest.reviewTitle);
	if (numDeleted == 0) {
		return response.sendStatus(404);
	}
	return response.status(200).json({
		message: `Deleted ${numDeleted} records`
	});


}

/** edit a book review */
async function editBookReview(request: Request, response: Response, next: NextFunction) {
	const diff: IBookReviewUpdateRequest = <IBookReviewUpdateRequest> request.body;
	const targetReviewRID = diff['@rid'];
	if (!targetReviewRID) return response.status(400).json({message: 'Missing "@rid" (record id) property on update request'})
	delete diff['@rid'];

	try {
		let updateCompleted: boolean = !!(await reviewService.updateReview(targetReviewRID, diff));
		if (!updateCompleted) return response.status(404).json({message: `Could not find a matching review to update!`});
		return response.status(200).json({message: `Review update completed!`})
	}
	catch (err) {
		return response.status(404).json({message: `could not find a matching review to update!`})
	}
}

/** edit a movie review */
async function editMovieReview(request: Request, response: Response, next: NextFunction){
	const diff: IMovieReviewUpdateRequest = <IBookReviewUpdateRequest> request.body;
	const targetReviewRID = diff['@rid'];
	if (!targetReviewRID) return response.status(400).json({message: 'Missing "@rid" (record id) property on update request'});
	delete diff['@rid']

	try {
		let updateCompleted: boolean = !!(await reviewService.updateReview(targetReviewRID, diff));
		if (!updateCompleted) return response.status(404).json({message: `Could not find a matching review to update!`});
		return response.status(200).json({message: `Review update completed!`})
	}
	catch (err) {
		return response.status(404).json({message: `could not find a matching review to update!`})
	}
}