import {IVertex} from "./_vertex";

export interface IUser extends IVertex {
	email: string
	username: string
	fullName: string
	hash: string
	uuid: string
	profilePictureUrl: string
}