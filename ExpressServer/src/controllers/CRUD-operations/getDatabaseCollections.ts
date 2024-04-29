import { Request, Response } from 'express';
import mongoose from 'mongoose';
import connectToMongoDB from '../connectToDB.js';

const getDatabaseCollections = (req: Request, res: Response) => {
  connectToMongoDB().then(async () => {
    const collectionNames: string[] = [];

    try {
      const db = mongoose.connection.db;
      const collections = await db.listCollections().toArray();
      collections.forEach((collection) => {
        const collectionName = collection.name.match(/^(currentlogfile)/i);
        if (collectionName) {
          collectionNames.push(collection.name);
        }
      });

      res.status(200).json(collectionNames);
    } catch (err) {
      res.status(500).send({ error: 'No database connection. ' + err });
    }
  });
};

export default getDatabaseCollections;
