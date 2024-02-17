const userService = require("../service/user-service");
const uploadService = require("../service/upload-service");
const fs = require("fs/promises");
const createError = require("../utils/create-error");

// Check exist user
exports.checkExistUser = async (req, res, next) => {
  try {
    const existsUser = await userService.findUserById(req.targetUserId);
    if (!existsUser) {
      createError("user not found ", 400);
    }
    delete existsUser.password;
    req.targetUser = existsUser;
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    if (!req.files) {
      createError("profile Image or Cover Image is required", 400);
    }

    const data = {};
    if (req.files.profileImage) {
      data.profileImage = await uploadService.upload(
        req.files.profileImage[0].path
      );

      fs.unlink(req.files.profileImage[0].path);
    }
    if (req.files.coverImage) {
      data.coverImage = await uploadService.upload(
        req.files.coverImage[0].path
      );

      fs.unlink(req.files.coverImage[0].path);
    }

    await userService.updateUserById(data, req.user.id);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};
