import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import multer from 'multer';
import path from 'path';
import { badRequestHandler, getDownloadsFile, getDownloadsFolder } from './GET';
import { fileFilter } from './extensionValidation';
import { handleFileUpload_StoreItemsOnServer } from './handleFileUpload';
import { storage } from './multerStorage';
import { handleFileUpload_StoreItemsInDB } from './utils/StoreItemsInDB';

const app = express();
dotenv.config();
const port = process.env.PORT;
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

app.use('/', express.static(path.join('../client/RoyalQuest-Logs-Analyzer/dist')));
app.use(cors());
app.use(compression());
app.use(limiter);

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/uploads', upload.single('file'), handleFileUpload_StoreItemsOnServer);
app.post('/storeInDB', upload.single('file'), handleFileUpload_StoreItemsInDB);

app.get('/downloads', getDownloadsFolder);
app.get('/downloads/:filename', getDownloadsFile);
app.get('*', badRequestHandler);
app.get('/getFilesPage', (req, res) => {
  const filePath = path.resolve('../client/RoyalQuest-Logs-Analyzer/dist/index.html');
  res.sendFile(filePath);
});
app.get('/getFilesPage/ItemsTable', (req, res) => {
  const filePath = path.resolve('../client/RoyalQuest-Logs-Analyzer/dist/index.html');
  res.sendFile(filePath);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
