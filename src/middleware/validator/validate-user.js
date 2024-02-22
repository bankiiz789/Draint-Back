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

const targetStoryIdSchema = Joi.object({
  targetStoryIdSchema: Joi.number().positive().required(),
});

exports.validateStoryId = (req, res, next) => {
  const { value, error } = targetStoryIdSchema.validate(req.params);
  if (error) {
    throw error;
  }
  req.targetStoryId = value.targetStoryId;
  next();
};
