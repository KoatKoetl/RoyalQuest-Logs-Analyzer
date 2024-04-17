import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import connectToMongoDB from './controllers/connectToDB.js';
import limiter from './middleware/express-rate-limit.js';
import router from './routes/routes.js';

const app = express();
dotenv.config();
const port = process.env.PORT;

connectToMongoDB();

app.use('/', express.static(path.join('../client/RoyalQuest-Logs-Analyzer/dist')));
app.use(cors());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(limiter);
app.use('/', router);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
