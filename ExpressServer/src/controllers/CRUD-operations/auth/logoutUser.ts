import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { refreshTokenModel } from '../../../models/Schemas.js';

const userLogout = async (req: Request, res: Response) => {
  try {
    const current_token = req.body.token;
    const allTokens = await refreshTokenModel.find();

    for (const tokenDoc of allTokens) {
      const token = tokenDoc.refresh_token;

      if (token === current_token) {
        await refreshTokenModel.deleteOne({ refresh_token: current_token });
        return res.sendStatus(204);
      }
    }
  } catch (error) {
    return res.sendStatus(500);
  }
};

export default userLogout;
