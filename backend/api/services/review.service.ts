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
	const newBookReview: IBookReview =  await database.create('VERTEX', BOOK_REVIEW)
		.set(review).one();
	console.log(`Created new book review:`);
	console.log(newBookReview);
	return newBookReview;
}

/** given the title of a book review, delete the book review */
export async function deleteBookReview(userUUID: string, bookTitle: string) {
	const database = await getDatabase();
	return await database.delete('VERTEX', BOOK_REVIEW)
		.where({
			reviewAuthorUUID: userUUID,
			bookTitle: bookTitle
		}).one();
}

/** create a movie review */
export async function createMovieReview(review: IMovieReview): Promise<IMovieReview> {
	const database = await getDatabase();
	return <IMovieReview> await database.create('VERTEX', BOOK_REVIEW)
		.set(review).one();
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