// library
const express = require("express");

// Controller
const authController = require("../controller/auth-controller");

//validate
const {
  validateRegister,
} = require("../middleware/validator/validate-register");
const { validateLogin } = require("../middleware/validator/validate-login");

//middleware
const authenticate = require("../middleware/authenticate");

const router = express.Router();

router.post("/register", validateRegister, authController.register);
router.post("/login", validateLogin, authController.login);
router.get("/me", authenticate, authController.getMe);

module.exports = router;
