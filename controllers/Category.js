const CategoriesService = require('../services/Category');

const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await CategoriesService.create(name);
    res.status(201).json(result.dataValues);
  } catch (error) {
    next(error);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const result = await CategoriesService.read();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};