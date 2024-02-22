const commentService = require("../service/comment-service");

exports.createComment = async (req, res, next) => {
  const data = {
    userId: req.user.id,
    storyId: req.body.storyId,
    content: req.body.content,
  };

  const comment = await commentService.createComment(data);
  res.status(200).json({ comment });
};
