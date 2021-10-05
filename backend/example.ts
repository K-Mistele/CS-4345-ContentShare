import { User } from './interfaces/user';

const OrientDB = require('orientjs');
const dotenv = require('dotenv');


dotenv.config();

async function main() {

	const ORIENTDB_ROOT_PASSWORD = process.env.ORIENTDB_ROOT_PASSWORD;
	if (!ORIENTDB_ROOT_PASSWORD) {
		throw new Error("Missing OrientDB Password!");
	}

	const server = OrientDB({
		host: 'ec2-34-228-9-221.compute-1.amazonaws.com',
		port: 2424,
		username: 'root',
		password: ORIENTDB_ROOT_PASSWORD,

	});
	const database = server.use('testdb');


	// ADD TWO USERS
	const firstUser: User = await database.create('VERTEX', 'user').set({
		name: 'Kyle Mistele',
		sex: 'male',
		id: 1
	}).one()
	console.log(`created user ${firstUser.name}`)

	const secondUser: User = await database.create('VERTEX', 'user').set({
		name: 'Andrew Mistele',
		sex: 'male',
		id: 2
	}).one()
	console.log(`created user ${secondUser.name}`)

	const thirdUser: User = await database.create('VERTEX', 'user').set({
		name: 'Joshua Mistele',
		sex: 'male',
		id: 3
	}).one()
	console.log(`created user ${thirdUser.name}`)


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



	// retrieve users by links
	const users: User[] = await database.select().from('user')

	// select all vertices where a friend link exists going out from the first user, i.e select all vertices that are friends of first user
	const linkedUsers: User[] = await database.query(
		`select expand(inV()) from friend_link where out = ${firstUser['@rid']};`
	).all();
	console.log(`friends of ${firstUser.name}`)
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
			id: firstUser.id
		})
		.all();
	console.log(`deleted ${del} vertices`);

	del2 = await database.delete('VERTEX', 'user')
		.where({
			id: secondUser.id
		})
		.all()
	console.log(`deleted ${del2} vertices`)

	console.log(`finished teardown!`);




	server.close();
}
main();