const express = require('express');
const PostController = require('../controllers/Post');
const { titleValidation, contentValidation,
  categoryIdExistValidation, categoryIdValidation } = require('../controllers/validations');
const auth = require('../controllers/auth');

const PostsRouter = express.Router();

PostsRouter.post('/', auth, titleValidation, contentValidation, categoryIdValidation,
categoryIdExistValidation, PostController.createPost);

PostsRouter.get('/', auth, PostController.getAllPosts);

PostsRouter.get('/:id', auth, PostController.getPostById);

module.exports = PostsRouter;