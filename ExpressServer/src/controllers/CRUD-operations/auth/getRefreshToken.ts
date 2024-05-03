import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { refreshTokenModel } from '../../../models/Schemas.js';
import { generateAccessToken } from './loginUser.js';

dotenv.config();

const getRefreshToken = async (req: Request, res: Response) => {
  if (!req.body.token) return res.sendStatus(401);

  try {
    const getRefreshToken = await refreshTokenModel.findOne({ refreshToken: req.body.token });
    const refreshToken = getRefreshToken?.toJSON().refreshToken as string;

    if (refreshToken) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403);

        if (typeof user === 'object' && 'name' in user) {
          const accessToken = generateAccessToken({ user: user.name });
          res.send({ accessToken: accessToken });
        }
      });
    } else {
      res.sendStatus(403);
    }
  } catch (error) {
    res.status(404).send({ error: error });
  }
};

export default getRefreshToken;
