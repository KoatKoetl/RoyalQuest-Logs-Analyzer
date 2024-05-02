import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { createMongooseModel, userSchema } from '../../../models/Schemas.js';

const loginUser = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  const userModel = createMongooseModel('users', userSchema);

  try {
    const findUser = await userModel.findOne({ login });

    if (!findUser) {
      res.status(404).send({ error: 'User not found' });
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, findUser?.password as string);

    if (!isPasswordCorrect) {
      res.status(404).send({ error: 'Invalid password' });
      return;
    }

    // Here work with JWT authentication, because user already passed authentication

    res.status(200).send({ message: 'Login succesfull' });
  } catch (error) {
    console.error('Error finding user or checking password', error);
    res.status(500).send({ error: 'Internal server error' });
  }
};

export default loginUser;
