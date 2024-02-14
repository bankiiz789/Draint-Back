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

exports.findUserById = (id) => prisma.user.findUnique({ where: { id } });
