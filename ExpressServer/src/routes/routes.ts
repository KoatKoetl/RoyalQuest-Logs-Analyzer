import express, { Request, Response } from 'express';
import multer from 'multer';
import { badRequestHandler, getDownloadsFile, getDownloadsFolder } from '../GET.js';
import storeMongoDB from '../MongoDB/uploadUniqueItemsInDB.js';
import { findItemByIDinDB, findItemInDB, postItemInDB } from '../controllers/CRUD-Operations.js';
import { fileFilter } from '../controllers/extensionValidation.js';
import { handleFileUpload_StoreItemsOnServer } from '../handleFileUpload.js';
import { storage } from './multerStorage.js';

const router = express.Router();
const upload = multer({ storage: storage, fileFilter: fileFilter });

router.post('/addItemsInDB', upload.single('file'), (req: Request, res: Response) => storeMongoDB(req, res));
router.post('/storeOnServer', upload.single('file'), (req: Request, res: Response) => handleFileUpload_StoreItemsOnServer(req, res));
router.post('/addItem', (req: Request, res: Response) => postItemInDB(req, res));

router.get('*', (req: Request, res: Response) => badRequestHandler(req, res));
router.get('/downloads', (req: Request, res: Response) => getDownloadsFolder(req, res));
router.get('/downloads/:filename', (req: Request, res: Response) => getDownloadsFile(req, res));
router.get('/getItems', (req: Request, res: Response) => findItemInDB(req, res));
router.get('/:id', (req: Request, res: Response) => findItemByIDinDB(req, res));

export default router;