const express = require("express");
const {
  validateCreateStory,
} = require("../middleware/validator/validate-createStory");
const storyController = require("../controller/story-controller");

const router = express.Router();

router.post("/", validateCreateStory, storyController.createStory);
router.get("/all", storyController.getAllStory);

module.exports = router;
