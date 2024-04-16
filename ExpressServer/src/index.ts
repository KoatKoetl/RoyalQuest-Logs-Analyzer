import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import { badRequestHandler, getDownloadsFile, getDownloadsFolder } from './GET.js';
import storeMongoDB from './MongoDB/addItemsInDB.js';
import { router as ItemRouter } from './MongoDB/itemRouters.js';
import { fileFilter } from './extensionValidation.js';
import { handleFileUpload_StoreItemsOnServer } from './handleFileUpload.js';
import { storage } from './multerStorage.js';

const app = express();
dotenv.config();
const port = process.env.PORT;
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
});

const mongo_URL = 'mongodb://localhost:27017/RoyalQuest';

async function connectToMongoDB(connectionString: string) {
  await mongoose.connect(connectionString);
  console.log('Connected to MongoDB');
}

try {
  await connectToMongoDB(mongo_URL);
} catch (e) {
  console.log(e);
}

app.use('/', express.static(path.join('../client/RoyalQuest-Logs-Analyzer/dist')));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);
app.use('/api', ItemRouter);

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/uploads', upload.single('file'), handleFileUpload_StoreItemsOnServer);
app.post('/addItemsInDB', upload.single('file'), storeMongoDB);

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
