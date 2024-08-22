import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import router from './routers/index.js';
import { env } from './utils/env.js';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { UPLOAD_DIR } from './constants/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

export async function startServer() {
  const app = express();
  const PORT = Number(env('PORT', '3000'));

  app.use(express.json());
  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cookieParser());
  app.use(router);
  app.use(errorHandler);
  app.use(notFoundHandler);
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.set('json spaces', 2);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}



// register
// {
//   "name": "Alex",
//   "email": "johndoe@example.com",
//   "password": "12345"
//   "phoneNumber": "123-456-7890",
//   "contactType": "work"
// }


// create
// {
//   "name": "Adam",
//   "phoneNumber": "+1234567895",
//   "email": "Adamx@example.com",
//   "contactType": "personal"
// }
