import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const mongo_URL = process.env.DB_URL;
const db_name = process.env.DB_NAME;

const connectToMongoDB = async () => {
  try {
    await mongoose.connect(`${mongo_URL}/${db_name}`);
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Connected to MongoDB');
  }
};

export default connectToMongoDB;
