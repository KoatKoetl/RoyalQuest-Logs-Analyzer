import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import getRefreshToken from './getRefreshToken.js';

// To check token provide access and the refresh one
const checkToken = (req: Request, res: Response) => {
  const token = req.body.token;

  if (token == null) {
    return res.sendStatus(401);
  }

  jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
    if (err) {
      if (err.message.match('expired')) {
        getRefreshToken(req, res);
      } else {
        return res.sendStatus(403);
      }
    }
  });
};

export default checkToken;
