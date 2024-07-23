import Contact from '../db/models/contacts.js';

function getAllContacts() {
  return Contact.find();
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

export { getAllContacts, findById, createContact, deleteContact, updateContact };
