const { User } = require('../models');
const { findUserByToken } = require('./Post');

const emailExistenceValidation = async (email) => {
  const { length } = await User.findAll({ where: { email } });
  return length;
};

const create = async ({ displayName, email, password, image }) => {
  const isEmailValid = await emailExistenceValidation(email);
  if (isEmailValid) return { message: 'User already registered' };
  const result = await User.create({ displayName, email, password, image });
  return result;
};

const read = async () => {
  const result = await User.findAll();
  return result;
};

const readWithId = async (id) => {
  const result = await User.findAll({ where: { id } });
  return result;
};

const excludeWithToken = async (token) => {
  const userInfo = await findUserByToken(token);
  await User.destroy({ where: { id: userInfo.id } });
  return true;
};

module.exports = {
  create,
  read,
  readWithId,
  emailExistenceValidation,
  excludeWithToken,
};
