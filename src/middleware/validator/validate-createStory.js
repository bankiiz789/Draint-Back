const createError = require("../../utils/create-error");

exports.validateCreateStory = (req, res, next) => {
  const { title, content } = req.body;
  if ((!title || title.trim() == "") && (!content || title.trim() == "")) {
    console.log("check error");
    createError("at fill your title and your content", 400);
  }
  next();
};
