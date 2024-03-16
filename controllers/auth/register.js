const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models/users.js");

const register = async (req, res) => {
  const { password, email } = req.body;
  const lowerCaseEmail = email.toLowerCase();

  const user = await User.findOne({ email: lowerCaseEmail });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const avatarURL = gravatar.url(email);
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();
  const newUser = await User.create({
    ...req.body,
    email: lowerCaseEmail,
    password: hashedPassword,
    avatarURL,
    verificationToken,
  });
  const verificationEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}"> Click to verify </a>`,
    text: `To confirm you registration please open the link href="http://localhost:3000/api/users/verify/${verificationToken}`,
  };
  await sendEmail(verificationEmail);

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

module.exports = { register: ctrlWrapper(register) };
