const prisma = require("../model/prisma");

exports.findUserByEmailOrUsername = (emailOrUsername) =>
  prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrUsername }, { userName: emailOrUsername }],
    },
  });

exports.createUser = (data) => prisma.user.create({ data });

exports.findUser;
