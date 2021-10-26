import {Request, Response, NextFunction, Router} from 'express';
import {IAuthUser} from '../../interfaces/user';
import {IFriendRequest} from "../../interfaces/friendRequest";
import {IUserFriendRequests} from "../schemas/friend.schemas";
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

module.exports = router;

/** create a friend request */
async function createFriendRequest(request: Request, response: Response, next: NextFunction) {

	// get the user from the request, which is the requesting/source user
	const sourceUser: IUser = await getUserFromRequest(request);
	const friendCreationRequest: IFriendRequestCreation = <IFriendRequestCreation>request.body;
	let friendRequest: IFriendRequest
	try {
		friendRequest = await friendService.createFriendRequest(
			sourceUser,
			friendCreationRequest.destinationUserEmail
		);
	}
	catch (err) {
		return response.status(403).json({
			message: 'this friend request already exists!'
		})
	}
	if (friendRequest) {
		return response.status(200).json(friendRequest);
	}
	else {
		return response.status(404).json({
			message: `Unable to find a user with the specified email ${friendCreationRequest.destinationUserEmail}`
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
