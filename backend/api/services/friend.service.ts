import { IAuthUser, IUser } from "../../interfaces/user";
import { getDatabase, FRIEND, FRIEND_REQUEST, VERTEX, EDGE} from "./orientdb.service";
import { IFriend } from '../../interfaces/friend';
import { IFriendRequest} from "../../interfaces/friendRequest";
import * as userService from './user.service';
import { IUserFriendRequests } from "../schemas/friend.schemas";

/** Create a friend request from source user to request user */
export async function createFriendRequest(sourceUser: IUser, destinationUser: IUser): Promise<IFriendRequest>{

	// make sure that the source user has an RID for building the link
	if (!sourceUser['@rid']) throw new Error("sourceUser is missing @rid property! Did you fetch this user from the database?");

	// get the destination user, and make sure that they exist or else throw an error
	if (!destinationUser) {
		throw new Error('Unable to find a user with the specified email!');
	}

	const database = await getDatabase();

	// make sure that there are not any existing friend requests
	const requestExists: boolean = await friendRequestExists(sourceUser, destinationUser);
	if (requestExists) throw new Error("This friend request already exists!");

	return <IFriendRequest> await database.create(EDGE, FRIEND_REQUEST)
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
		`select expand(in) from ${FRIEND_REQUEST} where out = ${user['@rid']};`
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

/** check if a friend request exists */
export async function friendRequestExists(sourceUser: IUser, destinationUser: IUser): Promise<boolean> {
	const database = await getDatabase();
	const requests = <IUser[]> await database.query(
		`select expand(in) from ${FRIEND_REQUEST} where out = ${sourceUser['@rid']} and in = ${destinationUser['@rid']};`
	).all();
	return requests.length > 0;
}

/** accept a friend request */
export async function acceptFriendRequest(currentUser: IUser, requestingUser: IUser) {

	if (! await friendRequestExists(requestingUser, currentUser)) throw new Error('Unable to accept a friend request that does not exist!');

	const database = await getDatabase();
	// First, create a friend link from sender to recipient
	const firstLink: IFriend = <IFriend> await database.create(EDGE, FRIEND)
		.from(requestingUser['@rid'])
		.to(currentUser['@rid'])
		.one();
	console.log(`Created friend link from ${requestingUser.username} to ${currentUser.username}`)

	// Second, create a friend link from recipient to sender
	const secondLink: IFriend = <IFriend> await database.create(EDGE, FRIEND)
		.from(currentUser['@rid'])
		.to(requestingUser['@rid'])
		.one();
	console.log(`Created friend link from ${currentUser.username} to ${requestingUser.username}`)


	if (!firstLink || !secondLink) throw new Error('unable to add friend: link could not be created. Are both users valid?');

	const numLinksDeleted = await deleteFriendLink(requestingUser, currentUser);
	console.log(`Deleted ${numLinksDeleted} friend requests while adding friend`)



}

/** deny a friend request */
export async function denyFriendRequest(userUUID: string, requestingUserEmail: string) {
	// delete the friend request
}

/** get a list of friends for a user */
export async function getUserFriends(userUUID: string) {

}

/** helper function to delete a friend link */
async function deleteFriendLink(sender: IUser, recipient: IUser): Promise<number> {
	const database = await getDatabase();
	console.log(`deleting requests from ${sender['@rid']} to ${recipient['@rid']}`)
	return <number> await database.delete(EDGE, FRIEND_REQUEST)
		.where({
			out: sender['@rid'],
			in: recipient['@rid']
		}).all();
}