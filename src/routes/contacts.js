import { Router } from 'express';
import express from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';

import {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../controllers/contacts.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';

const router = Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContacts));

router.get('/contacts/:contactId', ctrlWrapper(getContactById));

router.post('/contacts', jsonParser, validateBody(createContactSchema), ctrlWrapper(createContact));

router.patch('/contacts/:contactId', jsonParser, validateBody(updateContactSchema), ctrlWrapper(updateContact));

router.delete('/contacts/:contactId', ctrlWrapper(deleteContact));

export default router;
