import {Request, Response, Router, NextFunction} from "express";
import {userRegistrationSchema, userLoginSchema} from "../schemas/user.schemas";
import { IUser } from '../../interfaces/user';
import {validateSchema} from "../services/requestValidation.service";
import * as userService from "../services/user.service";

const router: Router = Router();

// POST /user/register
router.post('/register', validateSchema(userRegistrationSchema), registerUser);
router.post('/login', validateSchema(userLoginSchema), loginUser);

module.exports = router;

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