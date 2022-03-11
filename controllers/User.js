const UserService = require('../services/User');

const createUser = async (req, res, next) => {
  try {
    const result = await UserService.create(req.body);
    if (result.message) {
      return res.status(409).json(result);
    }
    return res.status(201).json(result.dataValues);
  } catch (e) {
    next(e);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const result = await UserService.read();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await UserService.readWithId(+id);
    if (!result.length) return res.status(404).json({ message: 'User does not exist' });
    return res.status(200).json(result[0].dataValues);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
