const { Contact } = require("../../models/contacts.js");
const { HttpError, ctrlWrapper } = require("../../helpers");

const createContact = async (req, res) => {
  const { _id: owner } = req.user;
  const { name } = req.body;
  const findContact = await Contact.findOne({ name });

  if (findContact) {
    throw HttpError(409, "Contact already exists");
  }

  const result = await Contact.create({ ...req.body, owner });
  res.status(201).json(result);
};
module.exports = { createContact: ctrlWrapper(createContact) };
