const prisma = require("../model/prisma");

exports.staffPick = async (storyId, staffPick) => {
  await prisma.story.update({ where: { id: storyId }, data: { staffPick } });
};
