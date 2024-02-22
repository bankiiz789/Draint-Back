const staffService = require("../service/staff-service");

exports.staffPick = async (req, res, next) => {
  await staffService.staffPick(req.body.storyId, req.body.staffPick);
  res.status(200).json({ message: "picked" });
};
