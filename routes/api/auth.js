const express = require("express");
const ctrl = require("../../controllers/auth.js");
const { schema } = require("../../models/users.js");
const { validateBody } = require("../../helpers");

// const {}

const authRouter = express.Router();

authRouter.post("/register", validateBody(schema.schemaRegLog), ctrl.register);

authRouter.post("/login", validateBody(schema.schemaRegLog), ctrl.login);

authRouter.post("/logout");

authRouter.get("/current");

module.exports = authRouter;
