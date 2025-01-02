// routes/watchlist.js
const express = require('express');
const { getWatchlist, addStockToWatchlist ,deleteStockFromWatchlist} = require('../controllers/watchlistController');
const authenticateJWT = require('../middleware/auth');

const router = express.Router();

router.get('/', authenticateJWT, getWatchlist);
router.post('/', authenticateJWT, addStockToWatchlist);
router.post('/deleteItem', authenticateJWT, deleteStockFromWatchlist);

module.exports = router;
