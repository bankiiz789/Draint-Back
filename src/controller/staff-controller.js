const staffService = require("../service/staff-service");

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
