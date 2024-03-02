const express = require("express");
// const ctrl = require("../../controllers/contacts.js");
const ctrl = require("../../controllers/contacts/index.js");
const { validateId, validateBody, authenticate } = require("../../middlewares");
const { schema } = require("../../models/contacts.js");

const contactsRouter = express.Router();

contactsRouter.get("/", authenticate, ctrl.getAllContacts);

contactsRouter.get("/:id", authenticate, validateId, ctrl.getOneContact);

contactsRouter.post(
  "/",
  authenticate,
  validateBody(schema.createContactSchema),
  ctrl.createContact
);

contactsRouter.put(
  "/:id",
  authenticate,
  validateId,
  validateBody(schema.updateContactSchema),
  ctrl.updateContact
);

contactsRouter.delete("/:id", authenticate, validateId, ctrl.deleteContact);

contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  validateId,
  validateBody(schema.favoriteSchema),
  ctrl.updateStatusContact
);

module.exports = contactsRouter;
