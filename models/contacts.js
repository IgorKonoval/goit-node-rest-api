const { Schema, model } = require("mongoose");

const Joi = require("joi");

const regexName = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/;
const regexPhoneNumber = /\(?([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{4})/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      match: regexName,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
      match: regexPhoneNumber,
      required: [true, "Set phone number"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const createContactSchema = Joi.object({
  name: Joi.string().pattern(regexName).required(),
  email: Joi.string().required(),
  phone: Joi.string().pattern(regexPhoneNumber).required(),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().pattern(regexName),
  email: Joi.string(),
  phone: Joi.string().pattern(regexPhoneNumber),
  favorite: Joi.boolean(),
});

const favoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const idSchema = Joi.object({
  id: Joi.string().alphanum().length(24),
});

const schema = {
  createContactSchema,
  updateContactSchema,
  favoriteSchema,
  idSchema,
};

module.exports = { Contact, schema };
