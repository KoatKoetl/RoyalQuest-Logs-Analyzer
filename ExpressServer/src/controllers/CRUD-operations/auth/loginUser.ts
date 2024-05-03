import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import authToken from '../../../middleware/authToken.js';
import { refreshTokenModel, userModel } from '../../../models/Schemas.js';

dotenv.config();

const loginUser = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  try {
    const findUser = await userModel.findOne({ login });

    if (!findUser) {
      return res.status(404).send({ error: 'User not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser?.password as string);

    if (!isPasswordCorrect) {
      return res.status(404).send({ error: 'Invalid password' });
    }

    const username = login;
    const user = { name: username };

    const accessToken = generateAccessToken(user);
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string);

    const newRefreshToken = new refreshTokenModel({ refreshToken: refreshToken });
    await newRefreshToken.save();

    res.status(200).send({ success: 'Login succesfull', accessToken: accessToken, refreshToken: refreshToken });
  } catch (error) {
    console.error('Error finding user or checking password', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

const generateAccessToken = (user: object) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '15m' });
};

export default loginUser;

export { authToken, generateAccessToken };
