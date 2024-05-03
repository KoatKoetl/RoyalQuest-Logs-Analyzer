import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { userModel } from '../../../models/Schemas.js';

const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { login, password } = req.body;

    const existingUser = await userModel.findOne({ login: login });

    if (existingUser) {
      return res.status(400).send({ error: 'User name already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      _id: login,
      login: login,
      password: hashedPassword,
      role: 'user',
    });
    await newUser.save();

    res.status(201).send({ success: 'User created successfully' });
  } catch (error) {
    res.status(500).send({ error: 'User registration failed. Internal server error' });
  }
};

export default registerNewUser;
