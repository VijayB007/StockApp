// utils/jwt.js
const jwt = require('jsonwebtoken');

const secretKey = 'your_secret_key'; // You should store this securely

const generateToken = (user) => {
  return jwt.sign({ userId: user.user_id }, secretKey, { expiresIn: '1h' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
