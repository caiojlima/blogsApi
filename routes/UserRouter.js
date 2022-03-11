const express = require('express');
const UserController = require('../controllers/User');
const authorization = require('../controllers/auth');
const {
  displayNameValidation, emailValidation, passwordValidation,
} = require('../controllers/validations');

const UserRouter = express.Router();

UserRouter.post('/', displayNameValidation, passwordValidation,
emailValidation, UserController.createUser);

UserRouter.get('/', authorization, UserController.getUsers);

UserRouter.get('/:id', authorization, UserController.getUserById);

module.exports = UserRouter;
