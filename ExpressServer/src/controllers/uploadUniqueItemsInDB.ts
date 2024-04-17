import express, { Request, Response } from 'express';
import fs from 'fs';
import jsdom from 'jsdom';
import { Item } from '../models/itemSchema.js';

const { JSDOM } = jsdom;

const storeMongoDB = (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ error: 'Error uploading file' });
  }

  readFileAndProcessData(req.file.path, res);
};

const readFileAndProcessData = (filePath: string, res: Response) => {
  if (!filePath) {
    return res.status(500).send({ error: 'File not found on server' });
  }
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ error: `Can't read file data` });
    }
    processData(data, res);
  });
};

const processData = (data: string, res: Response) => {
  const fileDOM = new JSDOM(data);
  const document = fileDOM.window.document;
  const itemsData = extractDocumentData(document);
  addToDatabase(itemsData, res);
};

interface ItemsData {
  [index: string]: {
    name: string;
    type: string;
    rarity: string;
    rarityColor: string;
    marketPrice: number | string;
    NPCPrice: number | string;
  };
}

const extractDocumentData = (document: Document) => {
  const allItems: ItemsData = {};

  document.querySelectorAll('u').forEach((element) => {
    const text: string = element.textContent?.trim().replace(/ /g, '_') as string;

    if (!allItems[text]) {
      allItems[text] = {
        name: text,
        type: '',
        rarity: '',
        rarityColor: '',
        marketPrice: 0,
        NPCPrice: 0,
      };
    }
  });

  const allItemsArray = Object.entries(allItems).map(([key, value]) => ({ id: key, ...value }));

  return allItemsArray;
};

const addToDatabase = async (itemsData: {}[], res: Response) => {
  try {
    const bulkOps = itemsData.map((item) => ({
      insertOne: { document: item },
    }));
    const result = await Item.bulkWrite(bulkOps, { ordered: false });
    res.status(200).send({ success: 'Successfully inserted all items', insertedCount: 'Items inserted: ' + result.insertedCount });
  } catch (error: any) {
    if (error.code === 11000) {
      console.log('Duplicate key error. Code:', error.code);
      res.status(200).send({ success: 'Some items successfully inserted. Duplicates are skipped' });
    } else {
      console.log('MongoDB write error.', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  }
};

export default storeMongoDB;
