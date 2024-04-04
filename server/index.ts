import express, { Request, Response } from 'express';
import multer from 'multer';
// !Don't change cors to import
// It doesn't want to work if it's using import module
const cors = require('cors');

const app = express();
const port = 3000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') 
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage});

app.use(cors());

app.post('/upload', upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    return res.status(200).send('File uploaded successfully.');
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
