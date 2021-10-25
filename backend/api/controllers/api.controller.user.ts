import {Request, Response, Router, NextFunction} from "express";
import {userRegistrationSchema, userLoginSchema, userMeSchema} from "../schemas/user.schemas";
import { IUser } from '../../interfaces/user';
import {validateSchema} from "../services/requestValidation.service";
import * as userService from "../services/user.service";
import * as jwtService from '../services/jwt.service';
import { IAuthUser } from '../../interfaces/user';

const router: Router = Router();

// POST /user/register
router.post('/register', validateSchema(userRegistrationSchema), registerUser);
router.post('/login', validateSchema(userLoginSchema), loginUser);
router.get('/me', validateSchema(userMeSchema), jwtService.requireJWT, getMe);

module.exports = router;

/** create a new user */
async function registerUser(request: Request, response: Response, next: NextFunction) {

	// make sure that the user doesn't exist
	if (
		await userService.getUserByEmail(request.body.email) ||
		await userService.getUserByUsername(request.body.username)
	) {
		response.status(403);
		return response.json({
			message: `Error: this user already exists!`
		});
	}

	// Create the new user
	try {
		const newUser: IUser = await userService.registerUser(request.body)
		response.status(201);
		return response.json(newUser);
	}
	catch (err: any) {
		response.status(500);
		return response.json({
			message: `Error: ${err.message}`
		})
	}

}

/** authenticate a user and return a jwt */
async function loginUser(request: Request, response: Response, next: NextFunction) {

	try {
		const jwt = await userService.loginUser(request.body);
		response.status(200);
		return response.json({
			token: jwt
		})
	}
	catch (err: any) {
		response.status(401);
		return response.json({
			message: err.message
		})
	}
}

/** return my user information */
async function getMe(request: Request, response: Response, next: NextFunction) {

	try {
		const authUser: IAuthUser = <IAuthUser> request.user;
		const uuid: string = authUser.uuid;
		const user: IUser = await userService.getUserByUUID(uuid);
		delete user.hash;
		return response.status(200).json(user);
	}
	catch (err) {
		return response.status(400).json({message: 'bad JWT JSON payload'})
	}



}