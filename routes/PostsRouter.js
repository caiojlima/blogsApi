const express = require('express');
const PostController = require('../controllers/Post');
const { titleValidation, contentValidation, categoryIdUnauthorizedValidation,
  categoryIdExistValidation, categoryIdValidation } = require('../controllers/validations');
const auth = require('../controllers/auth');

const PostsRouter = express.Router();

PostsRouter.post('/', auth, titleValidation, contentValidation, categoryIdValidation,
categoryIdExistValidation, PostController.createPost);

PostsRouter.get('/', auth, PostController.getAllPosts);

PostsRouter.get('/:id', auth, PostController.getPostById);

PostsRouter.put('/:id', auth, contentValidation, titleValidation,
categoryIdUnauthorizedValidation, PostController.editPost);

PostsRouter.delete('/:id', auth, PostController.deletePost);
module.exports = PostsRouter;