import { Request, Response } from 'express';
import mongoose from 'mongoose';
import connectToMongoDB from './connectToDB.js';

const getDatabaseCollections = (req: Request, res: Response) => {
  connectToMongoDB().then(async () => {
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    const collectionNames: string[] = [];

    collections.forEach((collection) => {
      const collectionName = collection.name.match(/^(currentlogfile)/i);
      if (collectionName) {
        collectionNames.push(collection.name);
      }
    });
    res.status(200).json(collectionNames);
  });
};

export default getDatabaseCollections;
