import { IReview } from '../../interfaces/review';
import { IBookReview } from '../../interfaces/bookReview';
import { IMovieReview } from "../../interfaces/movieReview";
import { getDatabase } from './orientdb.service';

/** Table name for book review */
const BOOK_REVIEW = 'BookReview';

/** Table name for movie reviews */
const MOVIE_REVIEW = 'MovieReview';

/** create a book review */
export async function createBookReview(review: IBookReview): Promise<IBookReview> {

	const database = await getDatabase();
	return <IBookReview> await database.create('VERTEX', BOOK_REVIEW)
		.set(review).one();

}

/** given the title of a book review, delete the book review */
export async function deleteBookReview(userUUID: string, reviewTitle: string): Promise<number> {
	const database = await getDatabase();
	return await database.delete('VERTEX', BOOK_REVIEW)
		.where({
			reviewAuthorUUID: userUUID,
			reviewTitle: reviewTitle
		}).one();
}

/** create a movie review */
export async function createMovieReview(review: IMovieReview): Promise<IMovieReview> {
	const database = await getDatabase();
	return <IMovieReview> await database.create('VERTEX', MOVIE_REVIEW)
		.set(review).one();
}

/** delete a moview review */
export async function deleteMovieReview(userUUID: string, reviewTitle: string): Promise<number> {
	const database = await getDatabase();
	return await database.delete('VERTEX', MOVIE_REVIEW)
		.where({
			reviewAuthorUUID: userUUID,
			reviewTitle: reviewTitle
		}).one();
}

/** check if a book review exists */
export async function bookReviewExists(userUUID: string, reviewTitle: string): Promise<boolean> {
	const database = await getDatabase();
	const bookReview: IBookReview = await database.select().from(BOOK_REVIEW)
		.where( {
			reviewAuthorUUID: userUUID,
			reviewTitle: reviewTitle
		}).one();

	return !!bookReview; // force conversion to boolean

}

/** check if a book review exists */
export async function movieReviewExists(userUUID: string, reviewTitle: string): Promise<boolean> {
	const database = await getDatabase();
	const movieReview: IBookReview = await database.select().from(MOVIE_REVIEW)
		.where( {
			reviewAuthorUUID: userUUID,
			reviewTitle: reviewTitle
		}).one();

	return !!movieReview; // force conversion to boolean

}

/** get all of a users' book reviews */
export async function getUserBookReviews(userUUID: string): Promise<IBookReview[]> {
	const database = await getDatabase();
	return <IBookReview[]> await database.select().from(BOOK_REVIEW)
		.where({
			reviewAuthorUUID: userUUID
		}).all();
}

/** get all of a users' movie reviews */
export async function getUserMovieReviews(userUUID: string): Promise<IMovieReview[]> {
	const database = await getDatabase();
	return <IMovieReview[]> await database.select().from(MOVIE_REVIEW)
		.where({
			reviewAuthorUUID: userUUID
		}).all();
}