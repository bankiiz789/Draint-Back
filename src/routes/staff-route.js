const express = require("express");
const staffController = require("../controller/staff-controller");

const router = express.Router();

router.patch("/", staffController.staffPick);
router.patch("/verify", staffController.verifyPremium);
router.patch("/notVerify", staffController.notVerifyPremium);
router.get("/getAllTransaction", staffController.getAllTransaction);

module.exports = router;
