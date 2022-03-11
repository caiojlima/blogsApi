const PostServices = require('../services/Post');

const createPost = async (req, res, next) => {
  try {
    const { headers: { authorization } } = req;
    const result = await PostServices.create(req.body, authorization);
    return res.status(201).json(result.dataValues);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const result = await PostServices.read();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await PostServices.readById(+id);
    if (!result.length) {
      return res.status(404).json({ message: 'Post does not exist' });
    }
    return res.status(200).json(result[0].dataValues);
  } catch (error) {
    next(error);
  }
};

const editPost = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const result = await PostServices.update({ ...req.body, id: +req.params.id }, token);
    if (!result) return res.status(401).json({ message: 'Unauthorized user' });
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const token = req.headers.authorization;
    const result = await PostServices.exclude(+id, token);
    if (!result) return res.status(401).json({ message: 'Unauthorized user' });
    if (result.code) return res.status(result.code).json({ message: result.message });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const searchPosts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const result = await PostServices.search(q);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  editPost,
  deletePost,
  searchPosts,
};