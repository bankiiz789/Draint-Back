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
  await prisma.story.findMany({ include: { user: { select: userFilter } } });
