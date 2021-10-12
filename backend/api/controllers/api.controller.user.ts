import {Request, Response, Router, NextFunction} from "express";
import {userRegistrationSchema} from "../schemas/user.schemas";
import { IUser } from '../../interfaces/user';
import {validateSchema} from "../services/requestValidation.service";
import * as userService from '../services/user.service';
import {getUserByEmail} from "../services/user.service";
const router: Router = Router();

// POST /user/register
router.post('/register', validateSchema(userRegistrationSchema), registerUser);

module.exports = router;

async function registerUser(request: Request, response: Response, next: NextFunction) {
	console.log(request.body);

	let existingUser: IUser= await getUserByEmail(request.body.email);
	if (existingUser) {
		response.status(403);
		return response.json({
			message: `Error: this user already exists!`
		});
	}

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