const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const generateToken = (payload) => {
  const token = jwt.sign({ data: payload }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

const verifyToken = (payload) => {
  const decoded = jwt.verify(payload, process.env.JWT_SECRET);
  return decoded;
};

module.exports = {
  generateToken,
  verifyToken,
};
