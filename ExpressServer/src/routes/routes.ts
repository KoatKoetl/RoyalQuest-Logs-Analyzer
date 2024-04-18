import express, { Request, Response } from 'express';
import multer from 'multer';
import { findItemByIDinDB, findItemInDB, postItemInDB } from '../controllers/CRUD-Operations.js';
import { getDownloadsFile, getDownloadsFolder } from '../controllers/GET.js';
import { fileFilter } from '../controllers/extensionValidation.js';
import storeMongoDB_currentLogs from '../controllers/uploadCurrentLog.js';
import storeMongoDB_allitems from '../controllers/uploadUniqueItemsInDB.js';
import { storage } from './multerStorage.js';

const router = express.Router();
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/storeToAllItems', upload.single('file'), (req: Request, res: Response) => storeMongoDB_allitems(req, res));
router.post('/storeCurrentLogs', upload.single('file'), (req: Request, res: Response) => storeMongoDB_currentLogs(req, res));
router.post('/addItem', (req: Request, res: Response) => postItemInDB(req, res));

router.get('/downloads', (req: Request, res: Response) => getDownloadsFolder(req, res));
// get databasecollections
// get collection
router.get('/downloads/:filename', (req: Request, res: Response) => getDownloadsFile(req, res));
router.get('/getItems', (req: Request, res: Response) => findItemInDB(req, res));
router.get('/:id', (req: Request, res: Response) => findItemByIDinDB(req, res));

export default router;
