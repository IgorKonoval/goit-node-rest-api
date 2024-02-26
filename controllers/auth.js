const bcrypt = require("bcrypt");
const { User } = require("../models/users.js");
const { HttpError, ctrlWrapper } = require("../helpers");

const register = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({
    ...req.body,
    password: hashedPassword,
  });
  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const { password, email } = req.body;

  const user = await User.findOne({ email });
  const passCompare = await bcrypt.compare(password, user.password);

  if (!user || !passCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  res.json({ token: "Token" });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
};
