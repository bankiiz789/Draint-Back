const prisma = require("../model/prisma");

exports.staffPick = async (storyId, staffPick) => {
  await prisma.story.update({ where: { id: storyId }, data: { staffPick } });
};

exports.unPick = async (storyId, unPick) => {
  await prisma.story.update({ where: { id: storyId }, data: { staffPick } });
};

exports.verifyPremium = async (id, update) =>
  await prisma.transaction.update({
    where: { id },
    data: { status: update },
  });

exports.deleteTransaction = async (id) =>
  await prisma.transaction.delete({ where: { id } });

exports.getTransaction = () =>
  prisma.transaction.findMany({ orderBy: { createdAt: "desc" } });
