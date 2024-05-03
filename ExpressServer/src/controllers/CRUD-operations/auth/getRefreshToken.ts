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

const logout = async (req: Request, res: Response) => {
  try {
    const currentToken = req.body.token;
    const allTokens = await refreshTokenModel.find();

    for (const tokenDoc of allTokens) {
      const token = tokenDoc.refreshToken;

      if (token === currentToken) {
        await refreshTokenModel.deleteOne({ refreshToken: currentToken });
        return res.sendStatus(204);
      }
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

export { logout };

export default getRefreshToken;
