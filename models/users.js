const { Schema, model } = require("mongoose");

const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const userSchema = Schema(
  {
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegex,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

const User = model("user", userSchema);

const schemaRegLog = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.min": "Minimum password length of 6 characters",
    "string.empty": "Password cannot be empty",
    "any.required": "Missing password field",
  }),
  email: Joi.string().pattern(emailRegex).required().messages({
    "string.pattern.base": "Invalid email format",
    "any.required": "Missing email field",
  }),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const schema = {
  schemaRegLog,
  subscriptionSchema,
};

module.exports = {
  User,
  schema,
};
