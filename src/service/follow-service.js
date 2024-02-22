const prisma = require("../model/prisma");

exports.createFollow = (data) => prisma.follow.create({ data });
