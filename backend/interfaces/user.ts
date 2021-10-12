import {IVertex} from "./_vertex";

export interface IUser extends IVertex {
	email: string
	username: string
	fullName: string
	hash: string
	guid: string
	profilePictureUrl: string
}