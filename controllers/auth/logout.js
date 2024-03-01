const { User } = require("../../models/users.js");
const { HttpError, ctrlWrapper } = require("../../helpers");

const logout = async (req, res) => {
  const { _id } = req.user;
  const result = await User.findByIdAndUpdate(_id, { token: null });

  if (!result) {
    throw HttpError(401, "Not authorized");
  }

  res.status(204).json({});
};

module.exports = { logout: ctrlWrapper(logout) };
