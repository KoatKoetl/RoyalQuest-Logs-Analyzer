import { Request, Response } from 'express';
import fs from 'fs';
import jsdom from 'jsdom';
import path from 'path';
import { ItemsDataExtended } from '../../../models/ItemInterface.js';
import { createMongooseModel, itemSchema } from '../../../models/Schemas.js';
import convertToArray from '../../../utils/convertToArray.js';
import { storeCurrentLog } from './addToDatabase.js';

const { JSDOM } = jsdom;

const storeMongoDB_currentLogs = (req: Request, res: Response) => {
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
    processData(data, filePath, res);
  });
};

const processData = (data: string, filePath: string, res: Response) => {
  const fileDOM = new JSDOM(data);
  const document = fileDOM.window.document;
  const itemsData = extractDocumentData(document);
  const fileName = path.basename(filePath, path.extname(filePath));

  const countedItems = createMongooseModel(`currentlogfile_${fileName}`, itemSchema);

  storeCurrentLog(itemsData, res, countedItems);
};

const extractDocumentData = (document: Document) => {
  const itemsData: ItemsDataExtended = {};

  document.querySelectorAll('u').forEach((element) => {
    const parentElementValue: string | undefined = element.parentNode?.textContent?.trim();
    const matchMyItems = parentElementValue?.match(/^(get|получен)\s+(item|предмет)/i);

    if (matchMyItems) {
      const text: string = element.textContent?.trim().replace(/ /g, '_') as string;
      const matchStackItems = parentElementValue?.match(/(\d+)шт|(\d+)pcs/i);

      if (!itemsData[text]) {
        itemsData[text] = {
          _id: text.toLocaleLowerCase(),
          name: text,
          type: '',
          rarity: '',
          rarityColor: '',
          marketPrice: 0,
          NPCPrice: 0,
          amount: 0,
        };
      }
      if (matchStackItems) {
        itemsData[text].amount += parseInt(matchStackItems[1]);
      } else {
        itemsData[text].amount++;
      }
    }
  });

  const itemsDataArr = convertToArray(itemsData);

  return itemsDataArr;
};

export default storeMongoDB_currentLogs;
