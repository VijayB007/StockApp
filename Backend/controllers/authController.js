// controllers/authController.js
const pool = require('../config/db');
const { generateToken } = require('../utils/jwt');
// const bcrypt = require('bcryptjs');

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];

    //   const isMatch = await bcrypt.compare(password, user.password);
      if (user.password==password) {
        const token = generateToken(user);
        res.json({ token });
      } else {
        
        res.status(401).send('Invalid credentials');
      }
    } else {
      res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


const registerUser = async (req, res) => {
  const { username,email, password } = req.body;
 console.log(req.body);
  try {
    const result = await pool.query('INSERT INTO users(username,email,password) values($1,$2,$3)', [username,email, password]);
    res.status(200).json(req.body)
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const getusername = async (req, res) => {

  try {
    const userId = req.user.userId;
    const result = await pool.query('SELECT username FROM users where user_id=$1',[userId]);
    
    if (result.rows.length > 0) {
      const user = result.rows[0];
      

     //   const isMatch = await bcrypt.compare(password, user.password);
      
        res.json({ user });
      } else {
        res.status(401).send('Server Error');
      }
    } 
   catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = {
  loginUser,
  registerUser,
  getusername
};
