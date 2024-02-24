import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

import { dbConection } from './database';
import router from './routers';

dotenv.config();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.MONGO_DB_URI as string;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors());
app.use('/api', router);

const start = async () => {
  try {
    await dbConection(DB_URL);
    app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
