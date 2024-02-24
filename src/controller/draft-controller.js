const draftService = require("../service/draft-service");
const uploadService = require("../service/upload-service");
const fs = require("fs/promises");

exports.createDraft = async (req, res, next) => {
  const data = {
    userId: req.user.id,
    title: req.body.title,
    content: req.body.content,
    category: req.body?.category,
    type: req.body?.type,
  };

  if (req.files?.coverImage) {
    data.coverImage = await uploadService.upload(req.files.coverImage[0].path);

    fs.unlink(req.files.coverImage[0].path);
  }

  const draft = await draftService.createDraft(data);
  res.status(200).json({ draft });
};

exports.updateDraft = async (req, res, next) => {
  try {
    const data = {};
    if (req.files?.coverImage) {
      data.coverImage = await uploadService.upload(
        req.files.coverImage[0].path
      );
      fs.unlink(req.files.coverImage[0].path);
    }
    if (req.body.title) {
      data.title = req.body.title;
    }
    if (req.body.content) {
      data.content = req.body.content;
    }
    if (req.body.category) {
      data.category = req.body.category;
    }
    if (req.body.type) {
      data.type = req.body.type;
    }

    await draftService.updateDraft(+req.body.draftId, data);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

exports.getOwnDraftByUserId = async (req, res, next) => {
  try {
    const draft = await draftService.getDraftByUserId(req.user.id);
    res.status(200).json({ draft });
  } catch (err) {
    console.log(err);
  }
};

exports.getTargetDraftByDraftId = async (req, res, next) => {
  try {
    const targetDraft = await draftService.getTargetDraftByDraftId(
      +req.params.draftId
    );
    res.status(200).json({ targetDraft });
  } catch (err) {
    console.log(err);
  }
};

exports.deleteDraft = async (req, res, next) => {
  try {
    await draftService.deleteDraft(+req.params.draftId);
    res.status(200).json({ message: "deleted draft" });
  } catch (err) {
    next(err);
  }
};
