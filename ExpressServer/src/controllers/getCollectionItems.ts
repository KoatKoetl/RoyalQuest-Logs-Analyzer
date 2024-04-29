import { Request, Response } from 'express';
import { createMongooseModel, itemSchema } from '../models/Schemas.js';

const getCollectionItems = async (req: Request, res: Response) => {
  const filename = req.params.filename;
  const itemModel = createMongooseModel(filename, itemSchema);

  try {
    const items = await itemModel.find().exec();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ err: err });
  }
};

export default getCollectionItems;
