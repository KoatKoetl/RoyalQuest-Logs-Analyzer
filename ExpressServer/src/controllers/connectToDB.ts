import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const mongo_URL = process.env.DB_URL;
const db_name = process.env.DB_NAME;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`${mongo_URL}/${db_name}`);
  } catch (error) {
    console.log(`Can't connect to MongoDB. ${error}`);
  } finally {
    console.log('Successfully connected to MongoDB');
  }
};

export default connectToMongoDB;
