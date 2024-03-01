const { Contact } = require("../models/contacts.js");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAllContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };

  if (favorite !== undefined) {
    filter.favorite = favorite === "true";
  }

  const result = await Contact.find(filter, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate();

  res.status(200).json(result);
};

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByOne({
    _id: id,
    owner,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

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

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findByIdAndDelete({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const { favorite } = req.body;

  if (favorite === undefined) {
    throw HttpError(400, "Missing field favorite");
  }

  const result = await Contact.findByIdAndUpdate(
    { _id: id, owner },
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
