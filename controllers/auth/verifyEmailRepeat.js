const { HttpError, ctrlWrapper, sendEmail } = require("../../helpers");
const { User } = require("../../models/users.js");

const verifyEmailRepeat = async (seq, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(400, "Missing required field email");
  }
  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verificationEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}"> Click to verify </a>`,
    text: `To confirm you registration please open the link href="http://localhost:3000/api/users/verify/${verificationToken}`,
  };

  await sendEmail(verificationEmail);

  res.status(200).json({ message: "Verification email sent" });
};

module.exports = { verifyEmailRepeat: ctrlWrapper(verifyEmailRepeat) };
