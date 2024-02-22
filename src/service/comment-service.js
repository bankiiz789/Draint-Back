const prisma = require("../model/prisma");

exports.createComment = async (data) =>
  await prisma.comment.create({
    data,
  });
