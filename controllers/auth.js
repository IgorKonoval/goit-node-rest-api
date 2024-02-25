const { User } = require("../models/users.js");
const { HttpError, ctrlWrapper } = require("../helpers");

const registerUser = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }
  const newUser = await User.create({ password, email });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = {
  registerUser: ctrlWrapper(registerUser),
};
