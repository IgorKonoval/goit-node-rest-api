const HttpError = require("./HttpError.js");
const { schema } = require("../models/contacts.js");

const validateId = (req, res, next) => {
  const { id } = req.params;
  const data = { id };
  const { error } = schema.idSchema.validate(data);
  if (error) {
    next(HttpError(400, `${id} is not valid id`));
  }
  next();
};

module.exports = { validateId };
