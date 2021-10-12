import { JWT_SECRET} from "./secrets.service";
import { IUser } from '../../interfaces/user';
import { Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";

/** Issue a JWT for a user */
export function issueJWT(user: IUser): string {
	return jwt.sign({
			uuid: user.uuid,
			fullName: user.fullName,
			username: user.username
		},
		JWT_SECRET,
		{
			expiresIn: "2h"
		}
	);
}

/** middleware to require a JWT. if a token is valid, the data (uuid, username, fullName) will be available at
 * request.user */
export function requireJWT(request: Request, response: Response, next: NextFunction){


		const token = request.body.token || request.query.token || request.headers["x-access-token"];

		if (!token) {
			response.status(403);
			return response.json({
				message: `A token is required for access!`
			})
		}
		try {
			request.user = jwt.verify(token, JWT_SECRET);
		} catch (err) {
			response.status(401);
			return response.json({
				message: `Invalid token!`
			})
		}
		return next();

}