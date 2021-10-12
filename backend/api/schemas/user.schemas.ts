import * as Joi from "joi";

export const userRegistrationSchema = Joi.object({
	fullName: Joi.string().required(),
	email: Joi.string().required(),
	username: Joi.string().required(),
	password: Joi.string().required(),
	confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
	profileUrl: Joi.string()
});

export interface IUserRegistration {
	fullName: string
	email: string
	username: string
	password: string
	confirmPassword: string
	profilePictureUrl: string
}

export const userLoginSchema = Joi.object({
	username: Joi.string().required(),
	password: Joi.string().required()
})

export interface IUserLogin {
	username: string
	password: string
}