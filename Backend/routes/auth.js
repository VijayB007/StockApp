// routes/auth.js
const express = require('express');
const { loginUser,registerUser,getusername } = require('../controllers/authController');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();
router.get('/getusername',authenticateJWT,getusername)
router.post('/login', loginUser);
router.post('/registerUser', registerUser);

module.exports = router;
