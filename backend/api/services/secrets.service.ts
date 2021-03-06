import crypto from "crypto";
const dotenv = require('dotenv');
dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || crypto.randomBytes(32).toString('hex');
export const ORIENTDB_ROOT_PASSWORD: string | undefined = process.env.ORIENTDB_ROOT_PASSWORD;
