const { getAllContacts } = require("./getAllContacts.js");
const { getOneContact } = require("./getOneContact.js");
const { createContact } = require("./createContact.js");
const { updateContact } = require("./updateContact.js");
const { deleteContact } = require("./deleteContact.js");
const { updateStatusContact } = require("./updateStatusContact.js");

module.exports = {
  getAllContacts,
  getOneContact,
  createContact,
  deleteContact,
  updateContact,
  updateStatusContact,
};
