// service
const jwtService = require("../service/jwt-service");
const bcryptService = require("../service/hash-service");
const userService = require("../service/user-service");
const createError = require("../utils/create-error");

exports.register = async (req, res, next) => {
  try {
    const existsUser = await userService.findUserByEmailOrUsername(
      req.body.email || req.body.userName
    );

    if (existsUser) {
      createError("username and email already in use", 401);
    }
    req.body.password = await bcryptService.hash(req.body.password);
    delete req.body.confirmPassword;

    const newUser = await userService.createUser(req.body);
    const payload = { userId: newUser.id };
    const accessToken = jwtService.sign(payload);
    delete newUser.password;

    res.status(200).json({ accessToken, newUser });
  } catch (err) {
    next(err);
  }
};
