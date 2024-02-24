const express = require("express");
const userController = require("../controller/user-controller");
const upload = require("../middleware/upload");
const { validateUserId } = require("../middleware/validator/validate-user");
const router = express.Router();
const upgradeAccountController = require("../controller/upgrade-controller");
const followController = require("../controller/follow-controller");

router.patch(
  "/",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userController.updateUser
);

router.get("/me", userController.getOwnStory);

router.get(
  "/:targetUserId/profile",
  validateUserId,
  userController.checkExistUser,
  userController.getUserByTargetUserId
);

router.post(
  "/upgrade",
  upload.fields([{ name: "slipSrc" }]),
  upgradeAccountController.upgradeAccount
);

router.post("/follow/:targetUserId", followController.createFollow);
router.delete("/follow/:followingId", followController.deleteFollow);

router.get("/memymine", userController.getMyMeMine);

router.get("/check", userController.checkDuplicateName);

module.exports = router;
