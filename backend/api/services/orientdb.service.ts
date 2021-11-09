const OrientDB = require('orientjs');
import {ORIENTDB_ROOT_PASSWORD} from "./secrets.service";

if (!ORIENTDB_ROOT_PASSWORD) {
	throw new Error("Missing OrientDB Password!");
}
const server = OrientDB({
	host: 'ec2-34-228-9-221.compute-1.amazonaws.com',
	port: 2424,
	username: 'root',
	password: ORIENTDB_ROOT_PASSWORD,

});

/** getDatabase gets access to the requested database; default is 'contentShare' */
export async function getDatabase(databaseName: string = 'contentShare') {
	return server.use(databaseName);
}

/** type for creating an edge */
export const EDGE: string = 'EDGE';

/** type for creating a vertex */
export const VERTEX: string = 'VERTEX';

/** table name for Friend requests */
export const FRIEND_REQUEST: string = 'FriendRequest';

/** table name for friends */
export const FRIEND: string = 'Friend';

/** table name for Users */
export const USER: string = 'User';

/** table name for movie reviews */
export const MOVIE_REVIEW: string = 'MovieReview';

/** table name for book reviews */
export const BOOK_REVIEW: string = 'BookReview';