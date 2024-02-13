// library
const express = require("express");

// Controller
const authController = require("../controller/auth-controller");

//validate
const {
  validateRegister,
} = require("../middleware/validator/validate-register");
const { validateLogin } = require("../middleware/validator/validate-login");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);

module.exports = router;
