import { IUser } from './interfaces/user';
import { getDatabase } from './api/services/orientdb.service';

const OrientDB = require('orientjs');
const dotenv = require('dotenv');


dotenv.config();

async function main() {


	const database = await getDatabase();

	// ADD TWO USERS
	const firstUser: IUser = await database.create('VERTEX', 'user').set({
		fullName: 'Kyle Mistele',
		username: 'kmistele',
		uuid: 1
	}).one()
	console.log(`created user ${firstUser.fullName}`)

	const secondUser: IUser = await database.create('VERTEX', 'user').set({
		fullName: 'Andrew Mistele',
		username: 'amistele',
		uuid: 2
	}).one()
	console.log(`created user ${secondUser.fullName}`)

	const thirdUser: IUser = await database.create('VERTEX', 'user').set({
		fullName: 'Joshua Mistele',
		username: 'jmistele',
		uuid: 3
	}).one()
	console.log(`created user ${thirdUser.fullName}`)


	// Create a link
	let firstLink = await database.create('EDGE', 'friend_link')
		.from(firstUser['@rid'])
		.to(secondUser['@rid'])
		.one();
	let secondLink = await database.create('EDGE', 'friend_link')
		.from(secondUser['@rid'])
		.to(firstUser['@rid'])
		.one();
	let thirdLink = await database.create('EDGE', 'friend_link')
		.from(firstUser['@rid'])
		.to(thirdUser['@rid'])
		.one();

	console.dir(thirdLink)



	// retrieve users by links
	const users: IUser[] = await database.select().from('user')

	// select all vertices where a friend link exists going out from the first user, i.e select all vertices that are friends of first user
	const linkedUsers: IUser[] = await database.query(
		`select expand(inV()) from friend_link where out = ${firstUser['@rid']};`
	).all();
	console.log(`friends of ${firstUser.fullName}`)
	console.dir(linkedUsers);

	// Teardown

	// Delete edges

	let del = await database.delete('EDGE', 'friend_link')
		.from(firstLink.out)
		.to(firstLink.in)
		.scalar();
	console.log(`deleted ${del} edge`)
	let del2 = await database.delete('EDGE', 'friend_link')
		.from(secondLink.out)
		.to(secondLink.in)
		.scalar();
	console.log(`deleted ${del2} edge`)

	// delete users
	del = await database.delete('VERTEX', 'user')
		.where({
			id: firstUser.uuid
		})
		.all();
	console.log(`deleted ${del} vertices`);

	del2 = await database.delete('VERTEX', 'user')
		.where({
			id: secondUser.uuid
		})
		.all()
	console.log(`deleted ${del2} vertices`)

	console.log(`finished teardown!`);

}

if (require.main == module) {
	main();
}