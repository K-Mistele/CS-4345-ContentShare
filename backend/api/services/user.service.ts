import {IUser} from "../../interfaces/user";
import {IUserRegistration} from "../schemas/user.schemas";
import {getDatabase} from "./orientdb.service";
import {v4 as uuidv4} from 'uuid';

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

/** retrieveUserByUUID gets the use with the given uuid */
export async function getUserByUUID(uuid: string): Promise<IUser> {
	const database = await getDatabase();
	return await database.select().from('user')
		.where({
			uuid: uuid
		}).one();
}

