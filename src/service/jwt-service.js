const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "bank1234";
const EXPIRE_IN = process.env.EXPIRE_IN || "7d";

exports.sign = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: EXPIRE_IN });

exports.verify = (token) => jwt.verify(token, JWT_SECRET);
