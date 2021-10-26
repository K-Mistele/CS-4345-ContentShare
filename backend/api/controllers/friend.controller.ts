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

module.exports = router;

/** create a friend request */
async function createFriendRequest(request: Request, response: Response, next: NextFunction) {

	// get the user from the request, which is the requesting/source user
	const sourceUser: IUser = await getUserFromRequest(request);
	const friendCreationRequest: IFriendRequestCreation = <IFriendRequestCreation>request.body;
	const friendRequest: IFriendRequest = await friendService.createFriendRequest(
		sourceUser,
		friendCreationRequest.destinationUserEmail
	);
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
	const friendRequests: IUserFriendRequests = await friendService.getFriendRequests(sourceUser);
	if (!friendRequests) {
		return response.status(404).json({
			message: `Unable to find friend requests for this user!`
		});
	}
	else {
		return response.status(200).json(friendRequests);
	}
}
