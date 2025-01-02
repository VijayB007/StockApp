// controllers/stocksController.js
const pool = require('../config/db');

const getAllStocks = async (req, res) => {
  try {
    const userId = req.user.userId;
    const results = await pool.query('SELECT * FROM stocks order by stock_id asc');
  


    res.json(results.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


const getTopStocks = async (req, res) => {
  try {
    const result = await pool.query('select * from stocks order by (market_price - previous_price) desc limit 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


module.exports = {
  getAllStocks,
  getTopStocks
};
