const storyService = require("../service/story-service");
const favService = require("../service/fav-service");

exports.toggleFav = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const storyId = +req.params.storyId;
    const fav = await favService.findFavByUserIdAndStoryId(userId, storyId);

    if (!fav) {
      await favService.createFav({ userId, storyId });
      await storyService.decreaseFav(storyId);
      return res.status(201).json({ message: "Favorite created" });
    }
    if (!fav.deletedAt) {
      await favService.updatedFav(new Date(), userId, storyId);
      await storyService.decreaseFav(storyId);
      return res.status(201).json({ message: "unFav" });
    }
    await favService.updatedFav(null, userId, storyId);
    await storyService.increaseFav(storyId);
    return res.status(201).json({ message: "Favorited" });
  } catch (err) {
    console.log(err);
  }
};
