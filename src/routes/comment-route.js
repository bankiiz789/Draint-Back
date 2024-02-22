const commentController = require("../controller/comment-controller");
const express = require("express");

const router = express.Router();

router.post("/", commentController.createComment);

module.exports = router;
