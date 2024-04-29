import express, { Request, Response } from 'express';
import multer from 'multer';
import getCollectionItems from '../controllers/CRUD-operations/getCollectionItems.js';
import getDatabaseCollections from '../controllers/CRUD-operations/getDatabaseCollections.js';
import storeMongoDB_currentLogs from '../controllers/CRUD-operations/uploadCurrentLog.js';
import { fileFilter } from '../controllers/extensionValidation.js';
import storeMongoDB_allitems from '../controllers/CRUD-operations/uploadUniqueItemsInDB.js';
import { storage } from './multerStorage.js';

const router = express.Router();
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/storeToAllItems', upload.single('file'), (req: Request, res: Response) => storeMongoDB_allitems(req, res));
router.post('/storeCurrentLogs', upload.single('file'), (req: Request, res: Response) => storeMongoDB_currentLogs(req, res));
router.post('/createNewUser', (req: Request, res: Response) => 'the logic');

router.get('/databasecollections', (req: Request, res: Response) => getDatabaseCollections(req, res));
router.get('/collectionitems/:filename', (req: Request, res: Response) => getCollectionItems(req, res));
// add login route

export default router;
