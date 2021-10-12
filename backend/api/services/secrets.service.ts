import crypto from "crypto";

export const JWT_SECRET: string = crypto.randomBytes(32).toString('hex');
