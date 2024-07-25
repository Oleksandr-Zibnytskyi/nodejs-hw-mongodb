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

  const contactsQuery = Contact.find(filter);

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.countDocuments(contactsQuery.getQuery()),
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

function findById(id) {
  return Contact.findById(id);
}

function createContact(contact) {
  return Contact.create(contact);
}

function updateContact(id, contact) {
  return Contact.findByIdAndUpdate(id, contact, { new: true });
}

function deleteContact(id) {
  return Contact.findByIdAndDelete(id);
}

export {
  getAllContacts,
  findById,
  createContact,
  deleteContact,
  updateContact,
};
