import createHttpError from 'http-errors';

import * as ContactService from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

async function getContacts(req, res) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  console.log('Filter Params:', filter);
  console.log('Pagination Params:', { page, perPage });

  const contacts = await ContactService.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

async function getContactById(req, res, next) {
  const contactId = req.params.contactId;
  const contact = await ContactService.findById(contactId);

  if (contact === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    contactType: req.body.contactType,
  };

  const createdContact = await ContactService.createContact(contact);

  res
    .status(201)
    .send({
      status: 201,
      message: 'Successfully created a contact!',
      data: createdContact,
    });
}

async function updateContact(req, res, next) {
  const { contactId } = req.params;

  const contact = req.body;

  const result = await ContactService.updateContact(contactId, contact);

  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res
    .status(200)
    .send({ status: 200, message: 'Successfully patched a contact!', data: result });
}

async function deleteContact(req, res, next) {
  const { contactId } = req.params;

  const result = await ContactService.deleteContact(contactId);

  if (result === null) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.send({ status: 204, message: 'Contact deleted', data: result });
}

export { getContacts, getContactById, createContact, updateContact, deleteContact };
