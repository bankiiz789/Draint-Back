const Joi = require("joi");
const validate = require("./validatator");

const registerSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.empty": "please fill your Email",
    }),
  userName: Joi.string().required().trim().messages({
    "string.empty": "Please fill your Username",
  }),
  password: Joi.string()
    .pattern(/^[a-zA-Z0-9]{6,}$/)
    .required()
    .messages({
      "string.empty": "Password is required",
    }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "string.empty": "Confirm Password is required",
    "any.only": "Password and Confirm password didn't not match",
  }),
});

exports.validateRegister = validate(registerSchema);
