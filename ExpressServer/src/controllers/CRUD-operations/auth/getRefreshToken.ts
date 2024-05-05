import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { refreshTokenModel } from '../../../models/Schemas.js';
import { generateAccessToken } from './loginUser.js';

dotenv.config();

const getRefreshToken = async (req: Request, res: Response) => {
  if (!req.body.refresh_token) return res.sendStatus(401);

  try {
    const getRefreshToken = await refreshTokenModel.findOne({ refresh_token: req.body.refresh_token });
    const refresh_token = getRefreshToken?.toJSON().refresh_token as string;

    if (refresh_token) {
      jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET as string, (err, user) => {
        if (err) return res.sendStatus(403);

        if (typeof user === 'object' && 'name' in user) {
          const access_token = generateAccessToken({ user: user.name });
          res.send({ access_token: access_token });
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
