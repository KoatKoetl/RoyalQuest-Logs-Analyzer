import { Item } from '../models/itemSchema.js';

const findItemInDB = async (req: any, res: any) => {
  try {
    const data = await Item.find({});
    res.status(200).json(data);
  } catch (err) {
    res.status(404).send({ err: err });
  }
};

const findItemByIDinDB = async (req: any, res: any) => {
  try {
    const data = await Item.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

const postItemInDB = async (req: any, res: any) => {
  try {
    const data = await Item.create(req.body);
    res.status(200).json(data);
  } catch (err) {
    res.status(404).send({ error: err });
  }
};

export { findItemByIDinDB, findItemInDB, postItemInDB };
