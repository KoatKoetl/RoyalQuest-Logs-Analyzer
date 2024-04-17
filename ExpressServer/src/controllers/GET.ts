import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const badRequestHandler = (req: Request, res: Response) => {
  // // ! Set a 404 page or something to bad request
  // // * This handler will be called whenever the user can't get access to any other routes
  // res.sendFile(path.join('index.html'));
};

const getDownloadsFile = (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filePath = path.join('../ExpressServer/dist/files/downloads/', filename);
  console.log(filePath);
  res.download(filePath, (err: Error) => {
    if (err) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
};

const getDownloadsFolder = (req: Request, res: Response) => {
  const donwloadsFolder = path.join('../ExpressServer/dist/files/downloads');

  fs.readdir(donwloadsFolder, (err, files: string[]) => {
    if (err) {
      res.status(500).send({ error: 'Error reading directory' });
      return;
    }

    res.json({ files });
  });
};

export { badRequestHandler, getDownloadsFile, getDownloadsFolder };
