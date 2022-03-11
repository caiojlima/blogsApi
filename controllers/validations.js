const { checkIfCategoryExists } = require('../services/Category');

const displayNameValidation = (req, res, next) => {
  const { displayName } = req.body;
  if (displayName.length < 8) {
    return res.status(400).json({
      message: '"displayName" length must be at least 8 characters long',
    });
  }
  next();
};

const emailValidation = (req, res, next) => {
  const { email } = req.body;
  if (email === '') {
    return res.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (!email) return res.status(400).json({ message: '"email" is required' });
  const regex = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const isEmailValid = email.match(regex);
  if (!isEmailValid) {
    return res.status(400).json({ message: '"email" must be a valid email' });
  }
  next();
};

const passwordValidation = (req, res, next) => {
  const { password } = req.body;
  if (password === '') {
    return res.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (!password) return res.status(400).json({ message: '"password" is required' });
  if (password.length !== 6) {
    return res.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  next();
};

const categoryNameValidation = (req, res, next) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  next();
};

const titleValidation = (req, res, next) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  next();
};

const contentValidation = (req, res, next) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

const categoryIdValidation = (req, res, next) => {
  const { categoryIds } = req.body;
  if (!categoryIds) return res.status(400).json({ message: '"categoryIds" is required' });
  next();
};

const categoryIdExistValidation = async (req, res, next) => {
  const { categoryIds } = req.body;
  const isCategoryValid = await checkIfCategoryExists(categoryIds);
  console.log({ isCategoryValid });
  if (!isCategoryValid) {
    return res.status(400).json({ message: '"categoryIds" not found' });
  }
  next();
};

module.exports = {
  displayNameValidation,
  emailValidation,
  passwordValidation,
  categoryNameValidation,
  titleValidation,
  contentValidation,
  categoryIdExistValidation,
  categoryIdValidation,
};
