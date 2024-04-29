import express, { Request, Response } from 'express';
import multer from 'multer';
import getCollectionItems from '../controllers/CRUD-operations/Items/getCollectionItems.js';
import getDatabaseCollections from '../controllers/CRUD-operations/Items/getDatabaseCollections.js';
import storeMongoDB_currentLogs from '../controllers/CRUD-operations/Items/uploadCurrentLog.js';
import storeMongoDB_allitems from '../controllers/CRUD-operations/Items/uploadUniqueItemsInDB.js';
import { fileFilter } from '../controllers/extensionValidation.js';
import { storage } from './multerStorage.js';

const itemRouter = express.Router();
const upload = multer({ storage: storage, fileFilter: fileFilter });

itemRouter.post('/storeToAllItems', upload.single('file'), (req: Request, res: Response) => storeMongoDB_allitems(req, res));
itemRouter.post('/storeCurrentLogs', upload.single('file'), (req: Request, res: Response) => storeMongoDB_currentLogs(req, res));

itemRouter.get('/databasecollections', (req: Request, res: Response) => getDatabaseCollections(req, res));
itemRouter.get('/collectionitems/:filename', (req: Request, res: Response) => getCollectionItems(req, res));

export default itemRouter;
