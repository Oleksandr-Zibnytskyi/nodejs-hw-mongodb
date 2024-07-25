import createHttpError from 'http-errors';

import * as ContactService from '../services/contacts.js';

async function getContacts(_req, res) {
  const contacts = await ContactService.getAllContacts();
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

  res.status(204).send();
}

export { getContacts, getContactById, createContact, updateContact, deleteContact };
