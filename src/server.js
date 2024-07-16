import express from 'express';
import pino from 'pino-http';
import cors from 'cors';

import { getAllContacts, getContactById } from './services/contacts.js';
import { env } from './utils/env.js';
import dotenv from 'dotenv';

dotenv.config();

export async function setupServer() {
  const app = express();
  const PORT = Number(env('PORT', '3001'));

  app.use(cors());
  app.use(pino({ transport: { target: 'pino-pretty' } }));

  app.get('/contacts', async (req, res, next) => {
    try {
      const contacts = await getAllContacts();
      res
        .status(200)
        .json({
          status: 200,
          message: 'Successfully found contacts',
          data: contacts,
        });
    } catch (error) {
      next(error);
    }
  });

  app.get('/contacts/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const contact = await getContactById(id);

      if (!contact) {
        res.status(404).json({ message: 'Contact not found' });
        return;
      }

      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data: contact,
      });
    } catch (error) {
      next(error);
    }
  });

  app.use((req, res) => {
    res.status(404).send({ message: 'Not found' });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  });

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
