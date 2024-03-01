const { register } = require("./register.js");
const { login } = require("./login.js");
const { logout } = require("./logout.js");
const { getCurrent } = require("./getCurrent.js");
const { updateSubscription } = require("./updateSubscription.js");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateSubscription,
};
