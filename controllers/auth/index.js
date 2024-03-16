const { register } = require("./register.js");
const { login } = require("./login.js");
const { logout } = require("./logout.js");
const { getCurrent } = require("./getCurrent.js");
const { updateSubscription } = require("./updateSubscription.js");
const { updateAvatar } = require("./updateAvatar.js");
const { verifyEmail } = require("./verifyEmail.js");
const { verifyEmailRepeat } = require("./verifyEmailRepeat.js");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
  updateAvatar,
  verifyEmail,
  verifyEmailRepeat,
};
