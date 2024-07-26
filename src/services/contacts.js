import Contact from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

async function getAllContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
}

function getContactById(contactId) {
  return Contact.findById(contactId);
}

function createContact(contact) {
  return Contact.create(contact);
}

function updateContact(contactId, contact) {
  return Contact.findByIdAndUpdate(contactId, contact, { new: true });
}

function deleteContact(contactId) {
  return Contact.findByIdAndDelete(contactId);
}

export {
  getAllContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
