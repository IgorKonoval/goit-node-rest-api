const { User } = require("../../models/users.js");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateSubscription = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);

  if (!user) {
    throw HttpError(404, "Not found");
  }

  user.subscription = req.body.subscription;
  await user.save();
  res.json(user);
};

module.exports = { updateSubscription: ctrlWrapper(updateSubscription) };
