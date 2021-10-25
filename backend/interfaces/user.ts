import {IVertex} from "./_vertex";

/** a user from the database */
export interface IUser extends IVertex {
	email: string
	username: string
	fullName: string
	hash?: string // not present when a user is returned from the API
	uuid: string
	profilePictureUrl?: string
}

/** extends Express.User with the values in the JWT payload; present at request.user */
export interface IAuthUser extends Express.User {
	uuid: string
	fullName: string
	username: string
	iat: number
	exp: number
}
