const createError = require("../utils/create-error");
const jwtService = require("../service/jwt-service");
const userService = require("../service/user-service");

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith("Bearer ")) {
      createError("Invalid authorization headers", 401);
    }
    const token = authorization.split(" ")[1];
    const decodedPayload = jwtService.verify(token);
    const user = await userService.findUserById(decodedPayload.userId);
    if (!user) {
      createError("User was not found", 401);
    }
    delete user.password;
    req.user = user;
    console.log(user);
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = authenticate;
