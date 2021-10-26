import * as Joi from 'joi';
import { IUser} from "../../interfaces/user";
import { IFriendRequest } from '../../interfaces/friendRequest'

export const friendRequestCreationSchema = Joi.object({
	destinationUserEmail: Joi.string().required()
})

export interface IFriendRequestCreation {
	destinationUserEmail: string
}

export interface IUserFriendRequests {
	sentRequests: IFriendRequest[],
	receivedRequests: IFriendRequest[]
}

export const friendRequestAcceptanceSchema = Joi.object({
	email: Joi.string().required(),
	username: Joi.string().required(),
	fullName: Joi.string().required(),
	uuid: Joi.string().required(),
	profilePictureUrl: Joi.string()
})

export const friendRequestDenialSchema = Joi.object({
	email: Joi.string().required(),
	username: Joi.string().required(),
	fullName: Joi.string().required(),
	uuid: Joi.string().required(),
	profilePictureUrl: Joi.string()
})