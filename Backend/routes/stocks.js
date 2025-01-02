// routes/stocks.js
const express = require('express');
const { getAllStocks,getTopStocks } = require('../controllers/stocksController');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.get('/',authenticateJWT, getAllStocks);
router.get('/getTopStocks',getTopStocks)

module.exports = router;
