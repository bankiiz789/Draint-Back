const prisma = require("../model/prisma");

exports.staffPick = async (storyId, staffPick) => {
  await prisma.story.update({ where: { id: storyId }, data: { staffPick } });
};

exports.unPick = async (storyId, unPick) => {
  await prisma.story.update({ where: { id: storyId }, data: { staffPick } });
};
