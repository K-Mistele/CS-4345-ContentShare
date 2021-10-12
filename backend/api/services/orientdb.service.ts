const OrientDB = require('orientjs');
import {ORIENTDB_ROOT_PASSWORD} from "./secrets.service";

if (!ORIENTDB_ROOT_PASSWORD) {
	throw new Error("Missing OrientDB Password!");
}
const server = OrientDB({
	host: 'ec2-34-228-9-221.compute-1.amazonaws.com',
	port: 2424,
	username: 'root',
	password: ORIENTDB_ROOT_PASSWORD,

});

/** getDatabase gets access to the requested database; default is 'contentShare' */
export async function getDatabase(databaseName: string = 'contentShare') {
	return server.use(databaseName);
}