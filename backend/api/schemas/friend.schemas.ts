import * as Joi from 'joi';
import { IUser} from "../../interfaces/user";

export const friendRequestCreationSchema = Joi.object({
	destinationUserEmail: Joi.string().required()
})

export interface IFriendRequestCreation {
	destinationUserEmail: string
}

export interface IUserFriendRequests {
	sentRequests: IUser[],
	receivedRequests: IUser[]
}