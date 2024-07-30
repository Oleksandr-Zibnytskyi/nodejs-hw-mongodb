import { Router } from 'express';
import express from 'express';

import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';

import {
  getContactsController,
  getContactIdController,
  createContactController,
  changeContactController,
  deleteContactController,
  upsertContactController,
} from '../controllers/contacts.js';
import {ctrlWrapper} from '../utils/ctrlWrapper.js';

const router = Router();

const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getContactsController));

router.get('/contacts/:contactId', isValidId, ctrlWrapper(getContactIdController));

router.post('/contacts', jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.patch('/contacts/:contactId', jsonParser, isValidId, validateBody(updateContactSchema), ctrlWrapper(changeContactController));

router.delete('/contacts/:contactId', isValidId, ctrlWrapper(deleteContactController));

router.put('/:studentId', validateBody(createContactSchema), ctrlWrapper(upsertContactController),
);

export default router;
