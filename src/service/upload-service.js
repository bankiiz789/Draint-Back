const cloundinary = require("../config/cloundinary");

exports.upload = async (path) => {
  const { secure_url } = await cloundinary.uploader.upload(path, {
    use_filename: true,
  });
  return secure_url;
};
