const prisma = require("../model/prisma");
const userFilter = {
  id: true,
  userName: true,
  email: true,
  profileImage: true,
  coverImage: true,
  type: true,
};

exports.createStory = (data) => prisma.story.create({ data });

exports.getAllStory = async () =>
  await prisma.story.findMany({
    orderBy: { createdAt: "desc" },
    include: { user: { select: userFilter } },
  });

exports.getOwnStory = async (userId) => {
  const myStory = await prisma.story.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
  const countStory = await prisma.story.count({
    where: { userId },
  });

  return { myStory, countStory };
};

exports.deleteStory = (id) => prisma.story.delete({ where: { id } });

exports.decreaseFav = (storyId) =>
  prisma.story.update({
    where: { id: storyId },
    data: { totalFav: { decrement: 1 } },
  });
exports.increaseFav = (storyId) =>
  prisma.story.update({
    where: { id: storyId },
    data: { totalFav: { increment: 1 } },
  });

// exports.getStoryByStoryId = (storyId) =>
//   prisma.story.findUnique({
//     where: { id: storyId },
//     include: {
//       user: { select: { userFilter } },
//       Favorites: true,
//       Comments: { include: { select: { userFilter } } },
//     },
//   });

exports.getStoryByStoryId = (storyId) =>
  prisma.story.findUnique({
    where: { id: storyId },
    include: {
      user: { select: userFilter },
      Favorites: true,
      Comments: { include: { user: { select: userFilter } } },
    },
  });

exports.increaseComment = (storyId) => {
  prisma.story.update({
    where: { id: storyId },
    data: { totalComment: { increment: 1 } },
  });
};

exports.updateStory = (storyId, data) =>
  prisma.story.update({
    where: { id: storyId },
    data,
  });

exports.createDraft = (data) => prisma.draft.create({ data });
