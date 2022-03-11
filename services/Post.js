const { BlogPost, PostCategory, User, Category } = require('../models');
const { verifyToken } = require('../utils/jwtHandler');

const findUserByToken = async (token) => {
  const { data } = verifyToken(token);
  const [userInfo] = await User.findAll({ where: { email: data } });
  return userInfo;
};

const create = async ({ title, content, categoryIds }, token) => {
  const userInfo = await findUserByToken(token);
  const result = await BlogPost.create({ title, content, userId: userInfo.id });
  await categoryIds.forEach(async (categoryId) => {
    await PostCategory.create({ categoryId, postId: result.dataValues.id });
  });
  return result;
};

const read = async () => {
  const result = await BlogPost.findAll(
    { include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] },
  );

  return result;
};

const readById = async (id) => {
  const result = await BlogPost.findAll(
    { where: { id },
    include: [{ model: User, as: 'user' }, { model: Category, as: 'categories' }] },
  );
  return result;
};

const verifyTokenIdAndPost = async (id, token) => {
  const userInfo = await findUserByToken(token);
  const [result] = await readById(id);
  if (userInfo.id === result.dataValues.id) {
    return true;
  }
  return false;
};

const update = async ({ id, title, content }, token) => {
  const isUserAllowed = await verifyTokenIdAndPost(id, token);
  if (!isUserAllowed) return false;
  await BlogPost.update({ title, content }, { where: { id } });
  const [result] = await BlogPost.findAll(
    { where: { id }, include: { model: Category, as: 'categories' } },
  );
  console.log({ result });
  return result.dataValues;
};

module.exports = {
  create,
  read,
  readById,
  update,
};