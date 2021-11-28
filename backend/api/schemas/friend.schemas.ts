import * as Joi from 'joi';
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
	uuid: Joi.string().required()
})

export interface IFriendRequestAcceptance {
	uuid: string
}

export const friendRequestDenialSchema = Joi.object({
	uuid: Joi.string().required()
})

export interface IFriendRequestDenial extends IFriendRequestAcceptance {}

export const friendRemovalSchema = Joi.object({
	email: Joi.string().required()
});
export interface IFriendRemoval {
	email: string
}

export const viewFriendsReviewsSchema = Joi.object({
	uuid: Joi.string().required()
})
export interface IViewFriendsReviews {
	uuid: string
}