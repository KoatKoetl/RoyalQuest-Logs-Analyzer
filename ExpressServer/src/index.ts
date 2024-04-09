import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import multer from 'multer';
import path from 'path';
import { badRequestHandler, getDownloadsFile, getDownloadsFolder } from './GET';
import { fileFilter } from './extensionValidation';
import { handleFileUpload } from './handleFileUpload';
import { storage } from './multerStorage';

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(express.static(path.join('../client/RoyalQuest-Logs-Analyzer/dist')));
app.use(cors());

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/uploads', upload.single('file'), handleFileUpload);

app.get('/downloads', getDownloadsFolder);
app.get('/downloads/:filename', getDownloadsFile);
app.get('*', badRequestHandler);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
