import {Request, Response, NextFunction, Router} from 'express';
import {IFriendRequest} from "../../interfaces/friendRequest";
import {
	friendRequestAcceptanceSchema,
	friendRequestDenialSchema,
	friendRequestCreationSchema,
	friendRemovalSchema,
	IUserFriendRequests,
	IFriendRequestCreation,
	IFriendRemoval,
	IFriendRequestAcceptance,
	IFriendRequestDenial, IViewFriendsReviews, viewFriendsReviewsSchema
} from "../schemas/friend.schemas";
import {IFriend} from '../../interfaces/friend';
import {IUser} from '../../interfaces/user';
import * as userService from '../services/user.service';
import * as jwtService from '../services/jwt.service';
import * as friendService from '../services/friend.service';
import * as reviewService from '../services/review.service';
import {getUserFromRequest} from '../services/user.service';
import {validateSchema} from "../services/requestValidation.service";

const router: Router = Router();

// /friend
router.get('/', jwtService.requireJWT, getFriends);
router.delete('/', jwtService.requireJWT, validateSchema(friendRemovalSchema), removeFriend)
router.post('/request', validateSchema(friendRequestCreationSchema), jwtService.requireJWT, createFriendRequest);
router.get('/request', jwtService.requireJWT, getFriendRequests);
router.get('/request/sent', jwtService.requireJWT, getSentFriendRequests);
router.get('/request/received', jwtService.requireJWT, getReceivedFriendRequests);
router.post('/request/accept', jwtService.requireJWT, validateSchema(friendRequestAcceptanceSchema), acceptFriendRequest);
router.post('/request/deny', jwtService.requireJWT, validateSchema(friendRequestDenialSchema), denyFriendRequest);
router.post('/reviews', jwtService.requireJWT, validateSchema(viewFriendsReviewsSchema), getFriendsReviews);
module.exports = router;

/** get a user's friends */
async function getFriends(request: Request, response: Response, next: NextFunction) {
	const user: IUser = await getUserFromRequest(request);
	const friends = <IUser[]> await friendService.getUserFriends(user);
	return response.status(200).json(friends);

}

/** create a friend request */
async function createFriendRequest(request: Request, response: Response, next: NextFunction) {

	// get the user from the request, which is the requesting/source user
	const sourceUser: IUser = await getUserFromRequest(request);
	const destinationUserEmail: string = (<IFriendRequestCreation>request.body).destinationUserEmail;
	const destinationUser: IUser = await userService.getUserByEmail(destinationUserEmail);
	if (!destinationUser) return response.status(404).json({
		message: 'Unable to find the specified user!'
	})

	// Build the friend request
	let friendRequest: IFriendRequest
	try {
		friendRequest = await friendService.createFriendRequest(sourceUser, destinationUser);
	}
	catch (err: any) {
		return response.status(403).json({
			message: err.message
		})
	}
	if (friendRequest) {
		return response.status(200).json(friendRequest);
	}
	else {
		return response.status(404).json({
			message: `Unable to find a user with the specified email ${destinationUserEmail}`
		});
	}
}

/** get all of a user's friend requests */
async function getFriendRequests(request: Request, response: Response, next: NextFunction) {

	// get the user from the request
	const sourceUser: IUser = await getUserFromRequest(request);
	const friendRequests: IUserFriendRequests = await friendService.getAllFriendRequests(sourceUser);
	if (!friendRequests) {
		return response.status(404).json({
			message: `Unable to find friend requests for this user!`
		});
	}
	else {
		return response.status(200).json(friendRequests);
	}
}

/** get a user's sent friend requests */
async function getSentFriendRequests(request: Request, response: Response, next: NextFunction) {
	const sourceUser: IUser = await getUserFromRequest(request);
	const sentFriendRequests: IUser[] = await friendService.getSentFriendRequests(sourceUser);
	return response.status(200).json(sentFriendRequests);
}

/** get a user's received friend requests */
async function getReceivedFriendRequests(request: Request, response: Response, next: NextFunction) {
	const user: IUser = await getUserFromRequest(request);
	const receivedFriendRequests: IUser[] = await friendService.getReceivedFriendRequests(user);
	return response.status(200).json(receivedFriendRequests);
}

/** accept a received friend request */
async function acceptFriendRequest(request: Request, response: Response, next: NextFunction) {

	const friendRequestAcceptance: IFriendRequestAcceptance = <IFriendRequestAcceptance> request.body;
	const currentUser: IUser = await getUserFromRequest(request);
	const requestUser: IUser = await userService.getUserByUUID(friendRequestAcceptance.uuid);

	try {
		await friendService.acceptFriendRequest(currentUser, requestUser);
		return response.sendStatus(200);
	}
	catch (err: any) {
		return response.status(400).json({
			message: err.message
		})
	}
}

/** deny a received friend request */
async function denyFriendRequest(request: Request, response: Response, next: NextFunction) {
	const friendRequestDenial: IFriendRequestDenial = <IFriendRequestDenial> request.body
	const currentUser: IUser = await getUserFromRequest(request);
	const requestUser: IUser = await userService.getUserByUUID(friendRequestDenial.uuid);

	try {
		await friendService.denyFriendRequest(requestUser, currentUser);
		return response.sendStatus(200);
	}
	catch (err: any) {
		return response.sendStatus(400).json({
			message: err.message
		})
	}
}

/** remove a friend */
async function removeFriend(request: Request, response: Response, next: NextFunction) {
	const friendRemovalRequest: IFriendRemoval = <IFriendRemoval> request.body;
	const currentUser: IUser = await getUserFromRequest(request);
	const userToUnfriend: IUser = await userService.getUserByEmail(friendRemovalRequest.email);

	const numRecordsDeleted: number = await friendService.deleteUserFriend(currentUser, userToUnfriend);
	if (numRecordsDeleted >= 2) {
		return response.status(200).json({
			message: `Friend successfully removed`
		})
	} else {
		return response.status(500).json({
			message: `May have failed to completely remove friend`
		})
	}
}

/** get a friend's reviews */
async function getFriendsReviews(request: Request, response: Response, next: NextFunction) {
	const getFriendsReviewsRequest: IViewFriendsReviews = <IViewFriendsReviews> request.body;
	const currentUser: IUser = await getUserFromRequest(request);
	const secondUser: IUser = await userService.getUserByUUID(getFriendsReviewsRequest.uuid);
	console.log(secondUser);

	// validate that the user is a friend
	if (! await friendService.userIsFriend(currentUser, secondUser)) {
		return response.status(403).json({message: `You can only view a friend's reviews!`});
	}

	// return their reviews
	return response.status(200).json({
		movieReviews: await reviewService.getUserMovieReviews(secondUser.uuid),
		bookReviews: await reviewService.getUserBookReviews(secondUser.uuid)
	})
}