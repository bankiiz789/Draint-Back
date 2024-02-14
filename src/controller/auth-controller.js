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
      // return res.status(200).json({ email: "already in use" });
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

exports.login = async (req, res, next) => {
  try {
    const existsUser = await userService.findUserByEmailOrUsername(
      req.body.emailOrUserName
    );
    if (!existsUser) {
      createError("invalid Email or Username", 401);
    }

    const comparePass = await bcryptService.compare(
      req.body.password,
      existsUser.password
    );

    if (!comparePass) {
      createError("Your password incorrect", 401);
    }
    const payload = { userId: existsUser.id };
    const accessToken = jwtService.sign(payload);
    delete existsUser.password;
    res.status(200).json({ user: existsUser, accessToken });
  } catch (err) {
    next(err);
  }
};

exports.getMe = (req, res, next) => {
  console.log(req.user);
  res.status(200).json({ user: req.user });
};
