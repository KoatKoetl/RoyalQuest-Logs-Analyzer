import { Response } from 'express';
import { ItemsDataExtended } from '../../models/ItemInterface.js';

const storeAllItemsInDB = async (itemsData: {}[], res: Response, itemModel: any) => {
  try {
    const bulkOps = itemsData.map((item: ItemsDataExtended) => ({
      insertOne: { document: item },
    }));
    const result = await itemModel.bulkWrite(bulkOps, { ordered: false });
  } catch (error: any) {
    console.log('Duplicate key error in allgameitems. Code:', error.code);
  }
};

const fillThePrices = async (itemsData: {}[], res: Response, itemModel: any) => {
  try {
    const bulkOps = itemsData.map((item: ItemsDataExtended) => ({
      updateOne: {
        filter: { _id: item._id },
        update: {
          $set: {
            NPCPrice: item.NPCPrice,
            marketPrice: item.marketPrice,
          },
        },
        upsert: true,
      },
    }));
    const result = await itemModel.bulkWrite(bulkOps, { ordered: false });
    res.status(200).send({
      success: 'Succesfully added new game items in database and set the NPC prices',
      insertedCount: 'Total number of new items added: ' + result.insertedCount,
    });
  } catch (error: any) {
    if (error.code === 11000) {
      console.log('Duplicate key error in allgameitems. Code:', error.code);
      res.status(200).send({ success: 'New items succesfully added. NPC prices are added. Duplicates are skipped' });
    } else {
      console.log('MongoDB write error.', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
};

const storeCurrentLog = async (itemsData: {}[], res: Response, itemModel: any) => {
  try {
    const bulkOps = itemsData.map((item: ItemsDataExtended) => ({
      updateOne: {
        filter: { name: item.id },
        update: { $set: { ...item } },
        upsert: true,
      },
    }));
    const result = await itemModel.bulkWrite(bulkOps);
    res.status(200).send({ success: 'Succesfully added current log items', insertedCount: 'Total items added: ' + result.insertedCount });
  } catch (error: any) {
    console.log('MongoDB write error.', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
};

export { fillThePrices, storeAllItemsInDB, storeCurrentLog };
