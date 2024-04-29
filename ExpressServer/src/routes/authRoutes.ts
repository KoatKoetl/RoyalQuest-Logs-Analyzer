import express, { Request, Response } from 'express';
import registerNewUser from '../controllers/CRUD-operations/auth/addNewUser.js';

const authRouter = express.Router();

authRouter.post('/register', (req: Request, res: Response) => registerNewUser(req, res));

export default authRouter;
