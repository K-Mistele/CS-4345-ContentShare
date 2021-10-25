import {IAuthUser, IUser} from "../../interfaces/user";
import {IUserRegistration, IUserLogin} from "../schemas/user.schemas";
import {getDatabase} from "./orientdb.service";
import {v4 as uuidv4} from 'uuid';
import * as jwtService from './jwt.service';
import { Request } from 'express';

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds: number = 10;

/** registerUser creates a user in the database */
export async function registerUser(registerUserData: IUserRegistration): Promise<IUser> {

	// Generate the hash and store it; wrap in a promise to synchronize it
	const hashPromise = new Promise<string>((resolve, reject) => {
		bcrypt.hash(registerUserData.password, saltRounds, (err: Error, hash: string) => {
			if (err) {
				reject(err);
			} else {
				console.log(`Created hash ${hash}`);
				resolve(hash);
			}
		})
	});

	// Build the new user object
	const hash: string = await hashPromise;
	const uuid: string = uuidv4();
	let newUser: IUser = {
		fullName: registerUserData.fullName,
		username: registerUserData.username,
		email: registerUserData.email,
		hash: hash,
		profilePictureUrl: registerUserData.profilePictureUrl,
		uuid: uuid
	}

	// Insert into the database
	const database = await getDatabase();
	newUser = await database.create('VERTEX', 'User').set(newUser).one()
	return newUser;

}

/** getUserByEmail gets the user with a given email */
export async function getUserByEmail(email: string): Promise<IUser> {
	const database = await getDatabase();
	return await database.select().from('user')
		.where({
			email: email
		}).one();
}

/** getUserByUsername gets the use with the given uuid */
export async function getUserByUsername(username: string): Promise<IUser>{
	const database = await getDatabase();
	return await database.select().from('user')
		.where({
			username: username
		}).one();
}

/** getUserByUUID retrieves a user by the given uuid */
export async function getUserByUUID(uuid: string): Promise<IUser> {
	const database = await getDatabase();
	return await database.select().from('user')
		.where({
			uuid: uuid
		}).one();

}

/** get an IUser from an Express.Request object by parsing request.user */
export async function getUserFromRequest(request: Request): Promise<IUser> {
	const user: IAuthUser = <IAuthUser> request.user;
	return await getUserByUUID(user.uuid);
}

/** login a user given login data and return jwt token string */
export async function loginUser(loginData: IUserLogin): Promise<string> {

	// Try to get the user by username, and failing that by email
	let user: IUser = await getUserByUsername(loginData.username) || await getUserByEmail(loginData.username);
	if (!user) {
		throw new Error("invalid credentials!");
	}

	// Compare
	const match = await bcrypt.compare(loginData.password, user.hash);
	if (!match) {
		//console.log(`Login attempt for ${user.username} failed!`);
		throw new Error("invalid credentials!");
	}
	//console.log(`login attempt for ${user.username} should succeed!`)

	// Generate a JWT
	return jwtService.issueJWT(user);

}

