const prisma = require("../model/prisma");

exports.createFav = (data) => prisma.favorite.create({ data });

exports.deleteFav = (userId, storyId) =>
  prisma.favorite.delete({ where: { userId_storyId: { userId, storyId } } });

exports.findFavByUserIdAndStoryId = (userId, storyId) =>
  prisma.favorite.findUnique({
    where: { userId_storyId: { storyId, userId } },
  });

exports.updatedFav = (deletedAt, userId, storyId) =>
  prisma.favorite.update({
    data: { deletedAt },
    where: { userId_storyId: { storyId, userId } },
  });
