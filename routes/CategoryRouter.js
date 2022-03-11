const express = require('express');
const CategoriesController = require('../controllers/Category');
const authorization = require('../controllers/auth');
const { categoryNameValidation } = require('../controllers/validations');

const CategoriesRouter = express.Router();

CategoriesRouter.post('/', authorization, categoryNameValidation,
CategoriesController.createCategory);

CategoriesRouter.get('/', authorization, CategoriesController.getAllCategories);

module.exports = CategoriesRouter;