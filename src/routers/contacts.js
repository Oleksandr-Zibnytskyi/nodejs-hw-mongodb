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

import { checkRoles } from '../middlewares/checkRoles.js';

import { ROLES } from '../constants/index.js';

const router = Router();

const jsonParser = express.json();

router.use(authenticate);

router.get('/', checkRoles(ROLES.TEACHER), ctrlWrapper(getContactsController));

router.get('/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), isValidId, ctrlWrapper(getContactIdController));

router.post('/', checkRoles(ROLES.TEACHER), jsonParser, validateBody(createContactSchema), ctrlWrapper(createContactController));

router.put('/:contactId', checkRoles(ROLES.TEACHER), validateBody(createContactSchema), ctrlWrapper(upsertContactController));

router.patch('/:contactId', checkRoles(ROLES.TEACHER, ROLES.PARENT), jsonParser, isValidId, validateBody(updateContactSchema), ctrlWrapper(changeContactController));

router.delete('/:contactId', checkRoles(ROLES.TEACHER), isValidId, ctrlWrapper(deleteContactController));







export default router;
