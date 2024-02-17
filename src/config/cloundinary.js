const cloundinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUNDINARY_NAME,
  api_key: process.env.CLOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_SECRET_KEY,
});

module.exports = cloundinary;
