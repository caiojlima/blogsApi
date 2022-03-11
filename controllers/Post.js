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

module.exports = {
  createPost,
};