import {Request, Response, Router, NextFunction} from "express";

const router: Router = Router();

router.get('/register', (request: Request, response: Response, next: NextFunction) => {
	return response.send("hello, world");
})

router.get('/test2', (request: Request, response: Response, next: NextFunction) => {
	return response.json({
		message: 'hello, world!'
	})
})


// IMPORTANT! THIS MUST STAY AT THE BOTTOM OF THE FILE
module.exports = router;