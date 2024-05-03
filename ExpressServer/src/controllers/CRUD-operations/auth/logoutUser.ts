import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { refreshTokenModel } from '../../../models/Schemas.js';

const userLogout = async (req: Request, res: Response) => {
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

export default userLogout;
