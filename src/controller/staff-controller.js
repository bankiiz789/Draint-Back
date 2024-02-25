const staffService = require("../service/staff-service");
const userService = require("../service/user-service");

exports.staffPick = async (req, res, next) => {
  await staffService.staffPick(req.body.storyId, req.body.staffPick);
  //   const data = { id: req.body.storyId, staffPick: req.body.staffPick };
  //   await staffService.staffPick(data);
  res.status(200).json({ message: "picked" });
};

exports.unPick = async (req, res, next) => {
  await staffService.unPick(req.body.storyId, req.body.staffPick);
  res.status(200).json({ message: "unpicked" });
};

exports.verifyPremium = async (req, res, next) => {
  try {
    const update = { type: "PREMIUM" };
    await staffService.verifyPremium(+req.body.id, true);
    await userService.updateUserById(update, +req.body.userId);
    await staffService.deleteTransaction(+req.body.id);

    res.status(200).json({ message: "approve" });
  } catch (err) {
    next(err);
  }
};
exports.notVerifyPremium = async (req, res, next) => {
  try {
    const update = { type: "FREE" };
    await staffService.verifyPremium(+req.body.id, false);
    await userService.updateUserById(update, +req.body.userId);
    await staffService.deleteTransaction(+req.body.id);

    res.status(200).json({ message: "Unverify" });
  } catch (err) {
    next(err);
  }
};

exports.getAllTransaction = async (req, res, next) => {
  try {
    const allTransaction = await staffService.getTransaction();
    res.status(200).json({ allTransaction });
  } catch (err) {
    next(err);
  }
};
