import express, { Request, Response } from 'express';
import fs from 'fs';
import multer from 'multer';
const cheerio = require('cheerio');
// !Don't change cors to import
// It doesn't want to work if it's using import module
const cors = require('cors');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());

interface itemElement {
  parent: Object;
  prev: Object;
  next: Object;
  startIndex: Number;
  endIndex: Number;
  children: string[][];
  name: String;
  attribs: Object;
  type: String;
  namespace: String;
  'x-attribsNamespace'?: Object;
  'x-attribsPrefix'?: Object;
}

interface ItemData {
  [index: string]: {
    amount: number;
  };
}

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Parse data to correct JSON format
  //  * Need to move it from the post method or find another way to handle it
  fs.readFile(req.file.path, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading file' });
    }

    const $ = cheerio.load(data);
    const tableData: ItemData = {};

    $('table tr').each((index: Number, element: itemElement) => {
      $(element)
        // !Find in U but for 'Осколок Хрустальной реки' needed data from td
        .find('U')
        .each((i: Number, el: itemElement) => {
          const text: string = $(el).text().trim().replace(/ /g, '_');
          if (!tableData[text]) {
            tableData[text] = { amount: 0 };
          }
          tableData[text].amount++;
        });
    });

    res.json(tableData);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
