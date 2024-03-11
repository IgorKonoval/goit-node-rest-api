const express = require("express");
// const ctrl = require("../../controllers/auth.js");
const ctrl = require("../../controllers/auth/index.js");
const { schema } = require("../../models/users.js");
const { validateBody, authenticate, upload } = require("../../middlewares");

const authRouter = express.Router();

authRouter.post("/register", validateBody(schema.schemaRegLog), ctrl.register);

authRouter.post("/login", validateBody(schema.schemaRegLog), ctrl.login);

authRouter.post("/logout", authenticate, ctrl.logout);

authRouter.get("/current", authenticate, ctrl.getCurrent);

authRouter.patch(
  "/",
  authenticate,
  validateBody(schema.subscriptionSchema),
  ctrl.updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = authRouter;
