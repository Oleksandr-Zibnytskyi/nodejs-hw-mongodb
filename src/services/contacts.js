import { ContactsCollection } from '../db/models/contacts.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactsCollection.find();

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }
  if (filter.isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find({userId}).merge(contactsQuery).countDocuments(),
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
};

export const getContactById = async (contactId, userId) => {
  return await ContactsCollection.findOne(contactId, userId);
};


export const createContact = async (contactData) => {
  return await ContactsCollection.create(contactData);
};

export const updateContact = async (contactId, contact) => {
  return ContactsCollection.findByIdAndUpdate(contactId, contact, { new: true });
};

export const deleteContact = async (contactId, userId) => {
  return await ContactsCollection.findOneAndDelete(contactId, userId);
};

export const upsertContact = async (contactId, contact) => {
  return ContactsCollection.findByIdAndUpdate(contactId, contact, { new: true });
};


