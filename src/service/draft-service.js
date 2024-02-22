const prisma = require("../model/prisma");

exports.createDraft = (data) => prisma.draft.create({ data });

exports.getDraftByUserId = (userId) =>
  prisma.draft.findMany({ where: { userId } });

exports.getTargetDraftByDraftId = (draftId) =>
  prisma.draft.findUnique({ where: { id: draftId } });
