const e = require("express");
const prisma = require("../model/prisma");

exports.createDraft = (data) => prisma.draft.create({ data });

exports.updateDraft = (draftId, data) =>
  prisma.draft.update({ where: { id: draftId }, data });

exports.getDraftByUserId = (userId) =>
  prisma.draft.findMany({ where: { userId } });

exports.getTargetDraftByDraftId = (draftId) =>
  prisma.draft.findUnique({ where: { id: draftId } });

exports.deleteDraft = (draftId) =>
  prisma.draft.delete({ where: { id: draftId } });
