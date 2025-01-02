// middleware/auth.js
const { verifyToken } = require('../utils/jwt');

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;


  if (authHeader) {
    const token = authHeader.split(' ')[1];

    const user = verifyToken(token);
    if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(403); // Forbidden
    }
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWT;
