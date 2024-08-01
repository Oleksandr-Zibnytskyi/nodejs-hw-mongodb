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

import { authenticate } from '../middlewares/authenticate.js';


const router = Router();

const jsonParser = express.json();

router.use(authenticate);

router.get('/', ctrlWrapper(getContactsController));

router.get('/:contactId', isValidId, ctrlWrapper(getContactIdController));

router.post('/', jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.put('/:contactId', validateBody(createContactSchema), ctrlWrapper(upsertContactController));

router.patch('/:contactId', jsonParser, isValidId, validateBody(updateContactSchema), ctrlWrapper(changeContactController));

router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
