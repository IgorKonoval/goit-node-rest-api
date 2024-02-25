const express = require("express");
const { registerUser } = require("../../controllers/auth.js");
const { schema } = require("../../models/users.js");
const { validateBody } = require("../../helpers");

// const {}

const authRouter = express.Router();

authRouter.post("/register", validateBody(schema.schemaRegLog), registerUser);

authRouter.post("/login");

authRouter.post("/logout");

authRouter.get("/current");

module.exports = authRouter;
