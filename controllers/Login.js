const { generateToken } = require('../utils/jwtHandler');
const { emailExistenceValidation } = require('../services/User');

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await emailExistenceValidation(email);
    if (!result) return res.status(400).json({ message: 'Invalid fields' });
    const token = generateToken(email);
    return res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
};
