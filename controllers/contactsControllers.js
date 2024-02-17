const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
} = require("../services/contactsServices.js");
const {
  createContactSchema,
  updateContactSchema,
} = require("../schemas/contactsSchemas.js");
const { HttpError } = require("../helpers/HttpError.js");
const { validateBody } = require("../helpers/validateBody.js");

const getAllContacts = async (req, res) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json("Contact deleted:", result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const createContact = async (req, res) => {
  try {
    if (validateBody(createContactSchema(req.body))) {
      const result = await addContact(req.body);
      res.status(201).json(result);
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

const updateContact = async (req, res) => {
  try {
    if (!req.body) {
      throw HttpError(400, "Body must have at least one field");
    }
    if (validateBody(updateContactSchema(req.body))) {
      const { id } = req.params;
      const result = await updContact(id, req.body);
      if (!result) {
        throw HttpError(404, "Not found");
      }
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
