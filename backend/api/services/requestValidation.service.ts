import * as Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

/** validateRequest is used to validate schemas for requests */
function validateRequest(request: Request, response: Response, next: NextFunction, schema: Joi.AnySchema) {
	const options = {
		abortEarly: false,
		allowUnknown: true, // allow unknown properties in the request
		stripUnknown: false // don't strip unknown properties in the request
	}
	const { error, value } = schema.validate(request.body, options)
	if (error) {
		console.log(request.body);
		console.log(`Validation error! ${error.message}`)
		response.status(400);
		return response.json({
			message: `Validation error: ${error.message}`
		});
	}
	else {
		request.body = value;
		next();
	}
}

/** validateSchema returns a callback that validates the passed-in schema */
export function validateSchema(schema: Joi.AnySchema) {
	return function (request: Request, response: Response, next: NextFunction) {
		validateRequest(request, response, next, schema)
	}
}