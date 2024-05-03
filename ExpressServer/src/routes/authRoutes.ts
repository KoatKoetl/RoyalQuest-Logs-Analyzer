import express, { Request, Response } from 'express';
import registerNewUser from '../controllers/CRUD-operations/auth/addNewUser.js';
import getRefreshToken, { logout } from '../controllers/CRUD-operations/auth/getRefreshToken.js';
import loginUser from '../controllers/CRUD-operations/auth/loginUser.js';

const authRouter = express.Router();

authRouter.post('/register', (req: Request, res: Response) => registerNewUser(req, res));
authRouter.post('/login', (req: Request, res: Response) => loginUser(req, res));
authRouter.post('/token', (req: Request, res: Response) => getRefreshToken(req, res));
authRouter.delete('/logout', (req: Request, res: Response) => logout(req, res));

export default authRouter;
