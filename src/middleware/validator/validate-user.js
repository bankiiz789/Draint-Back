const Joi = require("joi");

const targetUserIdSchema = Joi.object({
  targetUserId: Joi.number().positive().required(),
});

exports.validateUserId = (req, res, next) => {
  const { value, error } = targetUserIdSchema.validate(req.params);
  if (error) {
    throw error;
  }
  req.targetUserId = value.targetUserId;
  next();
};
