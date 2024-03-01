const bcrypt = require("bcrypt");
const { HttpError, ctrlWrapper } = require("../../helpers");
const { User } = require("../../models/users.js");

const register = async (req, res) => {
  const { password, email } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  const user = await User.findOne({ email: lowerCaseEmail });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    email: lowerCaseEmail,
    password: hashedPassword,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
