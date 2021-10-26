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
	return <IFriendRequest> await database.create('EDGE', FRIEND_REQUEST)
		.from(sourceUser['@rid'])
		.to(destinationUser['@rid'])
		.one();

}

/** get all of my friend requests, both sent and pending approval */
export async function getFriendRequests(user: IUser): Promise<IUserFriendRequests>{

	const database = await getDatabase();
	const friendRequests: IUserFriendRequests = <IUserFriendRequests> {

		// get friend requests originating from the user
		sentRequests: <IUser[]> await database.query(
			`select expand(inV()) from ${FRIEND_REQUEST} where out = ${user['@rid']};`
		).all(),

		// get friend requests targeted to the user
		receivedRequests: <IUser[]> await database.query(
			`select expand(inV()) from ${FRIEND_REQUEST} where in = ${user['@rid']};`
		).all(),
	};

	// remove hashes from expanded users
	for (let i = 0; i < friendRequests.sentRequests.length; i++) {
		delete friendRequests.sentRequests[i].hash;
	}
	for (let i = 0; i < friendRequests.receivedRequests.length; i++) {
		delete friendRequests.receivedRequests[i].hash;
	}
	return friendRequests;

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