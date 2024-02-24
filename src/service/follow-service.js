const prisma = require("../model/prisma");

exports.createFollow = (data) => prisma.follow.create({ data });

exports.deleteFollow = (followerId, followingId) =>
  prisma.follow.delete({
    where: { followerId_followingId: { followerId, followingId } },
  });

exports.findFollow = (userId) => {
  const me = prisma.follow.findMany({ where: { userId } });
  const countFollow = prisma.follow.count({ where: { userId } });
};
