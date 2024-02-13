const Joi = require("joi");
const validate = require("./validatator");

const loginSchema = Joi.object({
  emailOrUserName: Joi.string().required().messages({
    "string.empty": "Email or Username is required",
    "any.empty": "Email of Username is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
    "any.empty": "Password is required",
  }),
});

exports.validateLogin = validate(loginSchema);
