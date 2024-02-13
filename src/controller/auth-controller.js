// service
const jwtService = require("../service/jwt-service");
const bcryptService = require("../service/hash-service");
const userService = require("../service/user-service");

exports.register = async (req, res, next) => {
  req.body.password = await bcryptService.hash(req.body.password);
  delete req.body.confirmPassword;

  const newUser = await userService.createUser(req.body);
  const payload = { userId: newUser.id };
  const accessToken = jwtService.sign(payload);
  delete newUser.password;

  res.status(200).json({ accessToken, newUser });
};
