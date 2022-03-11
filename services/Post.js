const { BlogPost, PostCategory, User, Category } = require('../models');
const { verifyToken } = require('../utils/jwtHandler');

const create = async ({ title, content, categoryIds }, token) => {
  const { data } = verifyToken(token);
  const [userInfo] = await User.findAll({ where: { email: data } });
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

module.exports = {
  create,
  read,
  readById,
};