import { IAuthUser, IUser } from "../../interfaces/user";
import { getDatabase, FRIEND, FRIEND_REQUEST, VERTEX, EDGE} from "./orientdb.service";
import { IFriendRequest} from "../../interfaces/friendRequest";
import * as userService from './user.service';
import { IUserFriendRequests } from "../schemas/friend.schemas";

/** Create a friend request from source user to request user */
export async function createFriendRequest(sourceUser: IUser, destinationUserEmail: string): Promise<IFriendRequest>{

	// make sure that the source user has an RID for building the link
	if (!sourceUser['@rid']) throw new Error("sourceUser is missing @rid property! Did you fetch this user from the database?");

	// get the destination user, and make sure that they exist or else throw an error
	const destinationUser: IUser = await userService.getUserByEmail(destinationUserEmail);
	if (!destinationUser) {
		throw new Error('Unable to find a user with the specified email!');
	}

	const database = await getDatabase();

	// make sure that there are not any existing friend requests
	const requestExists: boolean = await friendRequestExists(sourceUser, destinationUser);
	if (requestExists) throw new Error("This friend request already exists!");

	return <IFriendRequest> await database.create('EDGE', FRIEND_REQUEST)
		.from(sourceUser['@rid'])
		.to(destinationUser['@rid'])
		.one();

}

/** get all of my friend requests, both sent and pending approval */
export async function getAllFriendRequests(user: IUser): Promise<IUserFriendRequests>{

	const database = await getDatabase();
	return <IUserFriendRequests> {

		// get friend requests originating from the user
		sentRequests: await getSentFriendRequests(user),

		// get friend requests targeted to the user
		receivedRequests: await getReceivedFriendRequests(user),
	};

}

/** get all of a user's sent friend requests */
export async function getSentFriendRequests(user: IUser): Promise<IUser[]> {


	const database = await getDatabase();
	const sentRequests = <IUser[]> await database.query(
		`select expand(inV()) from ${FRIEND_REQUEST} where out = ${user['@rid']};`
	).all();

	// remove hashes
	for (let i = 0; i < sentRequests.length; i++) {
		delete sentRequests[i].hash;
	}
	return sentRequests;
}

/** get all of a user's received friend requests */
export async function getReceivedFriendRequests(user: IUser): Promise<IUser[]> {
	const database = await getDatabase();
	const receivedRequests = <IUser[]> await database.query(
		`select expand(out) from ${FRIEND_REQUEST} where in = ${user['@rid']};`
	).all();

	// remove hashes
	for (let i = 0; i < receivedRequests.length; i++) {
		delete receivedRequests[i].hash;
	}
	return receivedRequests;
}

/** get a specific friend request */
export async function friendRequestExists(sourceUser: IUser, destinationUser: IUser): Promise<boolean> {
	const database = await getDatabase();
	const requests = <IUser[]> await database.query(
		`select expand(in) from ${FRIEND_REQUEST} where out = ${sourceUser['@rid']} and in = ${destinationUser['@rid']};`
	).all();
	return requests.length > 0;
}
/** accept a friend request */
export function acceptFriendRequest(currentUserEmail: string, requestingUserEmail: string) {

}

/** deny a friend request */
export function denyFriendRequest(userUUID: string, requestingUserEmail: string) {

}

/** get a list of friends for a user */
export function getUserFriends(userUUID: string) {

}