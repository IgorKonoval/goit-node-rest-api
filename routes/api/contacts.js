const express = require("express");
const ctrl = require("../../controllers/contacts.js");
const { validateId, validateBody } = require("../../helpers/index.js");
const { schema } = require("../../models/contacts.js");

const contactsRouter = express.Router();

contactsRouter.get("/", ctrl.getAllContacts);

contactsRouter.get("/:id", validateId, ctrl.getOneContact);

contactsRouter.post(
  "/",
  validateBody(schema.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  validateId,
  validateBody(schema.updateContactSchema),
  ctrl.updateContact
);

contactsRouter.delete("/:id", validateId, ctrl.deleteContact);

contactsRouter.patch(
  "/:id/favorite",
  validateId,
  validateBody(schema.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = contactsRouter;
