import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectToMongoDB from './controllers/connectToDB.js';
import limiter from './middleware/express-rate-limit.js';
import authRouter from './routes/authRoutes.js';
import itemRouter from './routes/itemCRUDroutes.js';
import cleanupOldFiles from './utils/cleanUpOldFiles.js';

const app = express();
dotenv.config();
const port = process.env.PORT;

connectToMongoDB();

app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);
app.use('/api', itemRouter);
app.use('/api/auth', authRouter);
app.use('/', express.static(path.join('../client/RoyalQuest-Logs-Analyzer/dist')));

app.get('*', (req, res) => {
  const filePath = path.resolve('../client/RoyalQuest-Logs-Analyzer/dist/index.html');
  res.sendFile(filePath);
});

cleanupOldFiles.start();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
