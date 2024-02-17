const storyService = require("../service/story-service");

exports.createStory = async (req, res, next) => {
  const data = {
    userId: req.user.id,
    title: req.body.title,
    content: req.body.content,
  };
  const story = await storyService.createStory(data);
  res.status(200).json({ story });
};
