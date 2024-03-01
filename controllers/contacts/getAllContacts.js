const { Contact } = require("../../models/contacts.js");
const { ctrlWrapper } = require("../../helpers");

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

module.exports = { getAllContacts: ctrlWrapper(getAllContacts) };
