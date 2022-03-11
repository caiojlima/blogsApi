const { Category } = require('../models');

const checkIfCategoryExists = async (categories) => {
  let boolResponse = true;
  const result = await Category.findAll();
  categories.forEach((categoryId) => {
    const bool = result.some(({ dataValues }) => dataValues.id === categoryId);
    if (!bool) {
      boolResponse = false;
    }
  });
  return boolResponse;
};

const create = async (name) => {
  const result = Category.create({ name });
  return result;
};

const read = async () => {
  const result = Category.findAll();
  return result;
};

module.exports = { 
  create,
  read,
  checkIfCategoryExists,
};