import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import fs from 'fs';
import jsdom from 'jsdom';
import multer from 'multer';
import path from 'path';

const app = express();
const { JSDOM } = jsdom;
app.use(cors());
dotenv.config();
const port = process.env.PORT;
const allowedExtensions = ['html', 'htm'];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const extensionValidation = (filename: string): boolean => {
  const extension = filename.split('.').pop()?.toLowerCase();
  return !!extension && allowedExtensions.includes(extension);
};

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (!extensionValidation(file.originalname)) {
    return cb(new Error(`File extension not allowed`), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

interface ItemsData {
  [index: string]: {
    amount: number;
  };
}

const handleFileUpload = (req: Request, res: Response) => {
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
  const itemsData: ItemsData = {};

  document.querySelectorAll('u').forEach((element) => {
    const text: string = element.textContent?.trim().replace(/ /g, '_') as string;

    const parentElementValue: string | undefined = element.parentNode?.textContent?.trim();
    const match = parentElementValue?.match(/(\d+)шт/i);

    if (!itemsData[text]) {
      itemsData[text] = { amount: 0 };
    }

    if (match) {
      itemsData[text].amount += parseInt(match[1]);
    } else {
      itemsData[text].amount++;
    }
  });

  return itemsData;
};

const writeDataToFile = (itemsData: ItemsData, filePath: string, res: Response) => {
  const jsonFileName = `src/downloads/${path.basename(filePath, path.extname(filePath))}.json`;

  fs.writeFile(jsonFileName, JSON.stringify(itemsData, null, 2), (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error saving the file data' });
    }
    console.log('Table data saved to:', jsonFileName);
    res.status(200).send({ success: 'File data successfully uploaded and saved' });
  });
};

app.post('/upload', upload.single('file'), handleFileUpload);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
