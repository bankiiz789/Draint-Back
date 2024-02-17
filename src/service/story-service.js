const prisma = require("../model/prisma");

exports.createStory = (data) => prisma.story.create({ data });
