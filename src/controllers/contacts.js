import createHttpError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  upsertContact
} from '../services/contacts.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const userId = req.user._id;


  const contacts = await getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactIdController = async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(req.params.id, req.user._id);

  if (!contact) {
    return next(createHttpError(404, 'Contact not found'));
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await createContact({
    ...req.body,
    parentId: req.user._id
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

export const changeContactController = async (req, res, next) => {
  const contact = await updateContact(req.params.id, req.user._id, req.body);
  if (!contact) {
    return res.status(404).json({
      status: 404,
      message: 'Contact not found'
    });
  }
  res
    .status(200)
    .send({
      status: 200,
      message: 'Successfully patched a contact!',
      data: contact,
    });
};

export const upsertContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactData = req.body;

    const contact = await upsertContact(contactId, contactData);

    res.status(contact._id ? 200 : 201).json(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const contact = await deleteContact(req.params.id, req.user._id);
    if (!contact) {
      return res.status(404).json({
        status: 404,
        message: 'Contact not found'
      });
    }

  res.status(204).send();
};





