const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { User } = require("../../models/users.js");
const { HttpError, ctrlWrapper } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { password, email } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  const user = await User.findOne({ email: lowerCaseEmail });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  const passCompare = await bcrypt.compare(password, user.password);

  if (!passCompare) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Your account is not verified");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = { login: ctrlWrapper(login) };
