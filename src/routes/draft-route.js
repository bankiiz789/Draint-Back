const express = require("express");
const draftController = require("../controller/draft-controller");
const {
  validateCreateStory,
} = require("../middleware/validator/validate-createStory");
const upload = require("../middleware/upload");

const router = express.Router();

router.post(
  "/",
  upload.fields([{ name: "coverImage" }]),
  validateCreateStory,
  draftController.createDraft
);

router.patch(
  "/update",
  upload.fields([{ name: "coverImage" }]),
  draftController.updateDraft
);

router.delete("/delete/:draftId", draftController.deleteDraft);

router.get("/me", draftController.getOwnDraftByUserId);

router.get("/:draftId", draftController.getTargetDraftByDraftId);
module.exports = router;
