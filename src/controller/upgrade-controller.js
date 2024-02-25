const upgradeAccountService = require("../service/upgradeAccount-service");
const uploadService = require("../service/upload-service");
const userService = require("../service/user-service");
const fs = require("fs/promises");

exports.upgradeAccount = async (req, res, next) => {
  try {
    const data = {
      userId: req.user.id,
    };
    if (req.files?.slipSrc) {
      data.slipSrc = await uploadService.upload(req.files.slipSrc[0].path);

      fs.unlink(req.files.slipSrc[0].path);
    }
    const upgrade = await upgradeAccountService.upgradeAccount(data);

    const update = {
      type: "PENDING",
    };

    await userService.updateUserById(update, req.user.id);

    res.status(200).json({ upgrade });
  } catch (err) {
    next(err);
  }
};
