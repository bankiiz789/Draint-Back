const draftService = require("../service/draft-service");
const uploadService = require("../service/upload-service");

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
