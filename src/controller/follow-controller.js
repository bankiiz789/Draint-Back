const followService = require("../service/follow-service");

exports.createFollow = async (req, res, next) => {
  try {
    const data = {
      followerId: req.user.id, // ผู้ติดตาม
      followingId: +req.params.targetUserId, // กำลังติดตาม
    };
    await followService.createFollow(data);
    res.status(200).json({ data });
  } catch (err) {
    next(err);
  }
};

exports.deleteFollow = async (req, res, next) => {
  try {
    const followerId = req.user.id;
    const followingId = +req.params.followingId;

    await followService.deleteFollow(followerId, followingId);
    res.status(200).json({ massage: "complete unfollowed" });
  } catch (err) {
    next(err);
  }
};
