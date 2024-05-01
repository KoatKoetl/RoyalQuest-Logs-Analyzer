import express, { Request, Response } from 'express';
import registerNewUser from '../controllers/CRUD-operations/auth/addNewUser.js';
import loginUser from '../controllers/CRUD-operations/auth/loginUser.js';

const authRouter = express.Router();

authRouter.post('/register', (req: Request, res: Response) => registerNewUser(req, res));
authRouter.post('/login', (req: Request, res: Response) => loginUser(req, res));

export default authRouter;
