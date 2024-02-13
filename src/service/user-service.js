const prisma = require("../model/prisma");

exports.createUser = (data) => prisma.user.create({ data });
