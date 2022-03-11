const { Category } = require('../models');

const checkIfCategoryExists = async (categories) => {
  let boolResponse = true;
  await categories.forEach(async (category) => {
    const result = await Category.findAll({ where: { id: category } });
    console.log({ result });
    if (!result.length) {
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