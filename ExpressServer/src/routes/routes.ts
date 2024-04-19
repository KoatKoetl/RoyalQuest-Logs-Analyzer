import express, { Request, Response } from 'express';
import multer from 'multer';
import { findItemByIDinDB, findItemInDB, postItemInDB } from '../controllers/CRUD-Operations.js';
import { fileFilter } from '../controllers/extensionValidation.js';
import getCollectionItems from '../controllers/getCollectionItems.js';
import getDatabaseCollections from '../controllers/getDatabaseCollections.js';
import storeMongoDB_currentLogs from '../controllers/uploadCurrentLog.js';
import storeMongoDB_allitems from '../controllers/uploadUniqueItemsInDB.js';
import { storage } from './multerStorage.js';

const router = express.Router();
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/storeToAllItems', upload.single('file'), (req: Request, res: Response) => storeMongoDB_allitems(req, res));
router.post('/storeCurrentLogs', upload.single('file'), (req: Request, res: Response) => storeMongoDB_currentLogs(req, res));
router.post('/addItem', (req: Request, res: Response) => postItemInDB(req, res));

router.get('/databasecollections', (req: Request, res: Response) => getDatabaseCollections(req, res));
router.get('/collectionitems/:filename', (req: Request, res: Response) => getCollectionItems(req, res));
router.get('/getItems', (req: Request, res: Response) => findItemInDB(req, res));
router.get('/:id', (req: Request, res: Response) => findItemByIDinDB(req, res));

export default router;
