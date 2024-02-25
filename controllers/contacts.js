const { Contact } = require("../models/contacts.js");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const result = await Contact.find();
  res.status(200).json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const createContact = async (req, res) => {
  const { name } = req.body;
  const findContact = await Contact.findOne({ name });

  if (findContact) {
    throw HttpError(409, "Contact already exists");
  }

  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (favorite === undefined) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getOneContact: ctrlWrapper(getOneContact),
  createContact: ctrlWrapper(createContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
};
