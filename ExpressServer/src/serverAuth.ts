import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectToMongoDB from './controllers/connectToDB.js';
import authRouter from './routes/authRoutes.js';

const app = express();
dotenv.config();
const port = process.env.AUTH_PORT;

connectToMongoDB();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
