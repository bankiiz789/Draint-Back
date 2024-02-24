const storyService = require("../service/story-service");
const favService = require("../service/fav-service");
const createError = require("../utils/create-error");

exports.createFav = async (req, res, next) => {
  try {
    const checkFav = await favService.findFavByUserIdAndStoryId(
      req.user.id,
      +req.params.storyId
    );

    if (checkFav) {
      createError("you already favorite", 400);
    }

    const userId = req.user.id;
    const storyId = +req.params.storyId;

    const data = {
      userId,
      storyId,
    };

    const fav = await favService.createFav(data);
    await storyService.increaseFav(+req.params.storyId);
    res.status(200).json({ fav });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteFav = async (req, res, next) => {
  try {
    const checkFav = await favService.findFavByUserIdAndStoryId(
      req.user.id,
      +req.params.storyId
    );

    if (!checkFav) {
      createError("you already Unfavorite", 400);
    }

    const userId = req.user.id;
    const storyId = +req.params.storyId;

    const unFav = await favService.deleteFav(userId, storyId);
    await storyService.decreaseFav(+req.params.storyId);
    res.status(200).json({ unFav });
  } catch (err) {
    console.log(err);
  }
};
