import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import contactsRouter from "./routes/contacts.js";
import { env } from './utils/env.js';
import dotenv from 'dotenv';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

dotenv.config();

export async function setupServer() {
  const app = express();
  const PORT = Number(env('PORT', '3000'));

  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.set('json spaces', 2);

  app.use(contactsRouter);

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello World!',
    });
  });

  app.use(errorHandler);

  app.use(notFoundHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

