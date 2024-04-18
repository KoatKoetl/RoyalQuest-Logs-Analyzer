import { Request, Response } from 'express';
import { createMongooseModel, itemSchema } from '../models/itemSchemas.js';

const uniqueItem = createMongooseModel('allgameitems', itemSchema);

const findItemInDB = async (req: Request, res: Response) => {
  try {
    const data = await uniqueItem.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(404).send({ err: err });
  }
};

const findItemByIDinDB = async (req: Request, res: Response) => {
  try {
    const data = await uniqueItem.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

const postItemInDB = async (req: Request, res: Response) => {
  try {
    const data = await uniqueItem.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

export { findItemByIDinDB, findItemInDB, postItemInDB };
