const express = require("express");
const {
  validateCreateStory,
} = require("../middleware/validator/validate-createStory");
const storyController = require("../controller/story-controller");

const router = express.Router();

router.use("/", validateCreateStory, storyController.createStory);

module.exports = router;
