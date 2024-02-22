const uploadService = require("../service/upload-service");
const storyService = require("../service/story-service");
const fs = require("fs/promises");
const createError = require("../utils/create-error");

exports.createStory = async (req, res, next) => {
  const data = {
    userId: req.user.id,
    title: req.body.title,
    content: req.body.content,
    category: req.body?.category,
    type: req.body?.type,
  };

  if (req.files?.coverImage) {
    data.coverImage = await uploadService.upload(req.files.coverImage[0].path);

    fs.unlink(req.files.coverImage[0].path);
  }
  //   console.log(data);
  const story = await storyService.createStory(data);
  res.status(200).json({ story });
};

exports.getAllStory = async (req, res, next) => {
  const story = await storyService.getAllStory();
  res.status(200).json({ story });
};

exports.deleteStory = async (req, res, next) => {
  await storyService.deleteStory(+req.params.storyId);
  console.log(req.params.storyId);
  res.status(200).json("delete success");
};

exports.getStoryByStoryId = async (req, res, next) => {
  try {
    const storyTarget = await storyService.getStoryByStoryId(
      +req.params.storyId
    );
    res.status(200).json({ storyTarget });
  } catch (err) {
    console.log(err);
  }
};

exports.updateStory = async (req, res, next) => {
  try {
    const data = {};
    if (req.files?.coverImage) {
      data.coverImage = await uploadService.upload(
        req.files.coverImage[0].path
      );
      fs.unlink(req.files.coverImage[0].path);
    }
    if (req.body.title) {
      data.title = req.body.title;
    }
    if (req.body.content) {
      data.content = req.body.content;
    }
    if (req.body.category) {
      data.category = req.body.category;
    }
    if (req.body.type) {
      data.type = req.body.type;
    }

    await storyService.updateStory(+req.body.storyId, data);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};
