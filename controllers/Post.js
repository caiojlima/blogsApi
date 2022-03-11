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

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
};