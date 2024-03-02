const { Contact } = require("../../models/contacts.js");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;
  const result = await Contact.findOne({
    _id: id,
    owner,
  });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};
module.exports = { getOneContact: ctrlWrapper(getOneContact) };
