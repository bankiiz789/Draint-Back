const express = require("express");
const userController = require("../controller/user-controller");
const upload = require("../middleware/upload");

const router = express.Router();

router.patch(
  "/",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userController.updateUser
);

module.exports = router;
