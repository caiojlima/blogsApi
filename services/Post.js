const { Post, PostCategories, User } = require('../models');
const { verifyToken } = require('../utils/jwtHandler');

const create = async ({ title, content, categoryIds }, token) => {
  console.log({ content, title, categoryIds });
  const { data } = verifyToken(token);
  const [userInfo] = await User.findAll({ where: { email: data } });
  console.log({ userInfo: userInfo.id });
  const result = await Post.create({ title, content, userId: userInfo.id });
  await categoryIds.forEach(async (categoryId) => {
    await PostCategories.create({ categoryId, postId: result.dataValues.id });
  });
  return result;
};

module.exports = {
  create,
};