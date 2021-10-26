import {Express, Request, Response, Router} from "express";
import bodyParser from "body-parser";

// import routers
const publicRouter: Router = require('./api/controllers/public.controller');
const userRouter: Router = require('./api/controllers/user.controller');
const reviewRouter: Router = require('./api/controllers/review.controller');
const friendRouter: Router = require('./api/controllers/friend.controller');


export class Server {

	private app: Express;

	constructor(app: Express) {

		// CREATE APP AND USE MIDDLEWARE
		this.app = app;
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended: false}));

		// Public routes
		this.app.use('/api/public', publicRouter);

		// Private routes
		this.app.use('/user', userRouter);
		this.app.use('/review', reviewRouter);
		this.app.use('/friend', friendRouter);

	}

	public start(port: number): void {
		this.app.listen(port, () => console.log(`Server listening on port ${port}!`));
	}

}