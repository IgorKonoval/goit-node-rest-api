const { Schema, model } = require("mongoose");

const Joi = require("joi");

const regexName = /^[A-Za-zА-Яа-я]+ [A-Za-zА-Яа-я]+$/;
const regexPhoneNumber = /\(?([0-9]{3})\)?([ -]?)([0-9]{3})\2([0-9]{4})/;
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const contactSchema = Schema(
  {
    name: {
      type: String,
      match: regexName,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      match: emailRegex,
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
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", contactSchema);

const createContactSchema = Joi.object({
  name: Joi.string().pattern(regexName).required().messages({
    "string.pattern.base": "Enter name and surname",
    "any.required": "Missing name field",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Missing email field",
  }),
  phone: Joi.string().pattern(regexPhoneNumber).required().messages({
    "string.pattern.base": "Enter phone number in format: 000-000-0000",
    "any.required": "Missing phone field",
  }),
  favorite: Joi.boolean(),
});

const updateContactSchema = Joi.object({
  name: Joi.string().pattern(regexName).messages({
    "string.pattern.base": "Enter name and surname",
    "any.required": "Missing name field",
  }),
  email: Joi.string().pattern(emailRegex).messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Missing email field",
  }),
  phone: Joi.string().pattern(regexPhoneNumber).messages({
    "string.pattern.base": "Enter phone number in format: 000-000-0000",
    "any.required": "Missing phone field",
  }),
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
