import {Request, Response, NextFunction, Router} from 'express';
import {IAuthUser} from '../../interfaces/user';
import {IFriendRequest} from "../../interfaces/friendRequest";
import {friendRequestAcceptanceSchema, IUserFriendRequests} from "../schemas/friend.schemas";
import {IFriend} from '../../interfaces/friend';
import {IUser} from '../../interfaces/user';
import * as userService from '../services/user.service';
import * as jwtService from '../services/jwt.service';
import * as friendService from '../services/friend.service';
import {getUserFromRequest} from '../services/user.service';
import {friendRequestCreationSchema, IFriendRequestCreation} from "../schemas/friend.schemas";
import {validateSchema} from "../services/requestValidation.service";

const router: Router = Router();

// /friend/request
router.post('/request', validateSchema(friendRequestCreationSchema), jwtService.requireJWT, createFriendRequest);
router.get('/request', jwtService.requireJWT, getFriendRequests);
router.get('/request/sent', jwtService.requireJWT, getSentFriendRequests);
router.get('/request/received', jwtService.requireJWT, getReceivedFriendRequests);
router.post('/request/accept', jwtService.requireJWT, validateSchema(friendRequestAcceptanceSchema), acceptFriendRequest);

module.exports = router;

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
	const currentUser: IUser = await getUserFromRequest(request);
	const requestUser: IUser = <IFriendRequest> request.body;

	try {
		await friendService.acceptFriendRequest(currentUser, requestUser);
		return response.sendStatus(200);
	}
	catch (err: any) {
		return response.sendStatus(400).json({
			message: err.message
		})
	}
}