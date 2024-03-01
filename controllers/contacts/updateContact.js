const { Contact } = require("../../models/contacts.js");
const { HttpError, ctrlWrapper } = require("../../helpers");

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

module.exports = { updateContact: ctrlWrapper(updateContact) };
