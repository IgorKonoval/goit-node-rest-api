const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const { HttpError } = require("../helpers/HttpError.js");

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.id === contactId);
  console.log(findContact);
  return findContact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contacts[index];
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return removedContact;
}

async function addContact(body) {
  const contacts = await listContacts();
  const findContact = contacts.find((contact) => contact.name === body.name);
  if (!findContact) {
    const newContact = {
      id: crypto.randomUUID(),
      ...body,
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log(newContact);
    return newContact;
  }
  throw HttpError(409, "Contact already exists");
}

async function updContact(id, body) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);

  if (index === -1) {
    return null;
  }

  contacts[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
};
