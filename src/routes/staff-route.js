const express = require("express");
const staffController = require("../controller/staff-controller");

const router = express.Router();

router.patch("/", staffController.staffPick);

module.exports = router;
