const prisma = require("../model/prisma");

exports.findUserByEmailOrUsername = (emailOrUsername) => {
  console.log(emailOrUsername);
  return prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { userName: emailOrUsername }],
    },
  });
};
exports.createUser = (data) => prisma.user.create({ data });

exports.findUserById = (id) =>
  prisma.user.findUnique({
    where: { id },
    include: { follower: true, following: true },
  });

exports.updateUserById = (data, id) =>
  prisma.user.update({ data, where: { id } });

exports.getUserByUserId = async (targetUserId) =>
  await prisma.user.findMany({
    where: { id: targetUserId },
    include: {
      Stories: { orderBy: { createdAt: "desc" } },
      follower: true,
      following: true,
    },
  });

exports.getMeMyMine = async (id) => prisma.user.findUnique({});
// exports.premiumUser = async (userId, upgrade) => {
//   await prisma.user.update({ where: { id: userId }, data: { type: upgrade } });
// };
