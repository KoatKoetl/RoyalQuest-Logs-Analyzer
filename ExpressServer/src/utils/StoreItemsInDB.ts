import express, { Request, Response } from 'express';
import fs from 'fs';
import jsdom from 'jsdom';

const { JSDOM } = jsdom;

interface ItemsData {
  items: {
    [index: string]: {
      itemName: string;
      type: string;
      rarity: string;
      rarityColor: string;
      NPCPrice: number | string;
      MarketPrice: number | string;
    };
  };
}

const handleFileUpload_StoreItemsInDB = (req: Request, res: Response) => {
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

  writeDataToFile(itemsData, filePath, res);
};

const extractDocumentData = (document: Document) => {
  const allItems: ItemsData = {
    items: {},
  };

  document.querySelectorAll('u').forEach((element) => {
    const text: string = element.textContent?.trim().replace(/ /g, '_') as string;

    if (!allItems.items[text]) {
      allItems.items[text] = {
        itemName: text,
        type: '',
        rarity: '',
        rarityColor: '',
        NPCPrice: 0,
        MarketPrice: 0,
      };
    }
  });

  return allItems;
};

const writeDataToFile = (itemsData: ItemsData, filePath: string, res: Response) => {
  const jsonFileName = `src/files/Items/allGameItems.json`;

  fs.writeFile(jsonFileName, JSON.stringify(itemsData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving the file data' });
    }
    console.log('Table data saved to:', jsonFileName);
    res.status(200).send({ success: 'File data successfully uploaded and saved in database' });
  });
};

export { handleFileUpload_StoreItemsInDB };
