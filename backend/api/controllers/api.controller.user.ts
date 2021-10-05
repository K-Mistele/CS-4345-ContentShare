import {Request, Response, Router, NextFunction} from "express";

const router: Router = Router();

// GET /user/:id
router.get('/:id', (request: Request, response: Response, next: NextFunction) => {

})

// GET /user/me
router.get('/me', (request: Request, response: Response, next: NextFunction) => {

})


// IMPORTANT! THIS MUST STAY AT THE BOTTOM OF THE FILE
module.exports = router;