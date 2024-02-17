const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updContact,
} = require("../services/contactsServices.js");
const {
  updateContactSchema,
  createContactSchema,
} = require("../schemas/contactsSchemas.js");
const { HttpError } = require("../helpers/HttpError.js");
const { validateBody } = require("../helpers/validateBody.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await getContactById(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

// const createContact = async (req, res, next) => {
//   try {
//     validateBody(createContactSchema)(req, res, async () => {
//       const result = await addContact(req.body);
//       if (result.name === req.body.name) {
//         throw HttpError(409, "Contact already exists");
//       }
//       res.status(201).json(result);
//     });
//   } catch (error) {
//     next(error);
//   }
// };

const createContact = async (req, res, next) => {
  try {
    const { error } = createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);
    if (result.name === req.body.name) {
      throw HttpError(409, "Contact already exists");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = updateContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await updContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
