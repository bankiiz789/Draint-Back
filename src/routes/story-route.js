const express = require("express");
const {
  validateCreateStory,
} = require("../middleware/validator/validate-createStory");
const storyController = require("../controller/story-controller");
const upload = require("../middleware/upload");
const favoriteController = require("../controller/fav-controller");

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "coverImage" }]),
  validateCreateStory,
  storyController.createStory
);
router.get("/all", storyController.getAllStory);

router.delete("/delete/:storyId", storyController.deleteStory);

//favorite
router.post("/:storyId/fav", favoriteController.createFav);
router.delete("/:storyId/fav", favoriteController.deleteFav);

router.get("/:storyId", storyController.getStoryByStoryId);

router.patch(
  "/update",
  upload.fields([{ name: "coverImage" }]),
  storyController.updateStory
);

module.exports = router;
