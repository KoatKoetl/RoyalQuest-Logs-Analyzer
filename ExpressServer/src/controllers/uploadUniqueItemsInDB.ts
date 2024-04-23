import express, { Request, Response } from 'express';
import fs from 'fs';
import jsdom from 'jsdom';
import { ItemsData } from '../models/ItemInterface.js';
import { createMongooseModel, itemSchema } from '../models/itemSchemas.js';
import convertToArray from '../utils/convertToArray.js';
import { fillTheNPCPrices, storeAllItemsInDB } from './addToDatabase.js';
import { getNPCPrices } from './getItemPrices.js';

const { JSDOM } = jsdom;

const storeMongoDB_allitems = (req: Request, res: Response) => {
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
  const uniqueItem = createMongooseModel('allgameitems', itemSchema);

  storeAllItemsInDB(itemsData, res, uniqueItem);
  fillTheNPCPrices(itemsData, res, uniqueItem);
};

const extractDocumentData = (document: Document) => {
  const allItems: ItemsData = {};

  document.querySelectorAll('u').forEach((element) => {
    const text: string = element.textContent?.trim().replace(/ /g, '_') as string;

    if (!allItems[text]) {
      allItems[text] = {
        _id: text.toLocaleLowerCase(),
        name: text,
        type: '',
        rarity: '',
        rarityColor: '',
        marketPrice: 0,
        NPCPrice: 0,
      };
    }

    getNPCPrices(element, allItems);
  });

  const allItemsArray = convertToArray(allItems);

  return allItemsArray;
};

export default storeMongoDB_allitems;
