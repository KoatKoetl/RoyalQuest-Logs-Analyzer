import express from 'express';
import { Item } from './itemsSchema.js';
const router = express.Router();

router.get('/getItems', async (req, res) => {
  try {
    const data = await Item.find({});
    console.log('Items found');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

router.post('/addItem', async (req, res) => {
  try {
    const data = await Item.create(req.body);
    console.log('Item added');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const data = await Item.findById(req.params.id);
    console.log('Item is retreived by id');
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

export { router };
