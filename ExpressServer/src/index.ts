import cors from 'cors';
import express, { Request, Response } from 'express';
import fs from 'fs';
import jsdom from 'jsdom';
import multer from 'multer';

const app = express();
const port = 3000;
const { JSDOM } = jsdom;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `src/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());

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

    const fileDOM = new JSDOM(data);
    const document = fileDOM.window.document;
    const tableData: ItemData = {};

    document.querySelectorAll('u').forEach((element) => {
      const text: string = element?.textContent?.trim().replace(/ /g, '_') as string;

      // Check if the parent element have number of multiple game items
      const parentElementValue: string | undefined = element.parentNode?.textContent?.trim();
      const match = parentElementValue?.match(/(\d+)шт/i);

      if (!tableData[text]) {
        tableData[text] = { amount: 0 };
      }

      if (match) {
        tableData[text].amount += parseInt(match[1]);
      } else {
        tableData[text].amount++;
      }
    });

    // res.status(200).send('File successfully uploaded');
    const jsonFileName = `src/downloads/${req.file?.originalname.replace(/\.[^/.]+$/, '')}.json`;
    fs.writeFile(jsonFileName, JSON.stringify(tableData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Error saving the file data' });
      }
      console.log('Table data saved to:', jsonFileName);
      res.status(200).send('File data successfully uploaded and saved');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
