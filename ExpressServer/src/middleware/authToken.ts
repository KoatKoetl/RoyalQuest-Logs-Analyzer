import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authToken = (req: Request, res: Response, next: Function) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.sendStatus(401);
  }

  jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    // Basically this req.user allows me to access the username in the router endpoint the username.
    // I could use it to name the collection correctly with users name and get the collection when users are logged in
    req.user = user;
    next();
  });
};

export default authToken;
