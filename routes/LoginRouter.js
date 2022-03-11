const express = require('express');
const LoginController = require('../controllers/Login');
const {
  emailValidation, passwordValidation,
} = require('../controllers/validations');

const LoginRouter = express.Router();

LoginRouter.post('/', passwordValidation,
emailValidation, LoginController);

module.exports = LoginRouter;