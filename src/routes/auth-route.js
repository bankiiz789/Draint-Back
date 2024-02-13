// library
const express = require("express");

// Controller
const authController = require("../controller/auth-controller");

//validate
const {
  validateRegister,
} = require("../middleware/validator/validate-register");

const router = express.Router();

router.post("/register", validateRegister, authController.register);

module.exports = router;
