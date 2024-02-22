const prisma = require("../model/prisma");

exports.upgradeAccount = (data) => prisma.transaction.create({ data });

exports.findSlip = (userId) =>
  prisma.transaction.findUnique({ where: { userId } });
