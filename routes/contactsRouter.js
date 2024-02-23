const express = require("express");
const control = require("../controllers/contactsControllers.js");
const { validateId, validateBody } = require("../helpers/index.js");
const { schema } = require("../models/contacts.js");

const contactsRouter = express.Router();

contactsRouter.get("/", control.getAllContacts);

contactsRouter.get("/:id", validateId, control.getOneContact);

contactsRouter.post(
  "/",
  validateBody(schema.createContactSchema),
  control.createContact
);

contactsRouter.put(
  "/:id",
  validateId,
  validateBody(schema.updateContactSchema),
  control.updateContact
);

contactsRouter.delete("/:id", validateId, control.deleteContact);

contactsRouter.patch(
  "/:id/favorite",
  validateId,
  validateBody(schema.favoriteSchema),
  control.updateStatusContact
);

module.exports = contactsRouter;
