// controllers/watchlistController.js
const pool = require('../config/db');

const getWatchlist = async (req, res) => {
  const userId = req.user.userId;
 
  try {
    const result = await pool.query(
      'SELECT w.stock_id, w.watchlist_id, w.date_added, s.ticker_symbol, s.company_name, s.market_price, s.previous_price ' +
      'FROM watchlist w ' +
      'JOIN stocks s ON w.stock_id = s.stock_id ' +
      'WHERE w.user_id = $1',
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

const addStockToWatchlist = async (req, res) => {
  const userId = req.user.userId;
  const { stockId } = req.body;
  console.log(req.body);
  try {
    const checkingStock =await pool.query('select * from watchlist where user_id=$1 and stock_id=$2',[userId,stockId]);
    if(checkingStock.rows.length>0){
      console.log(checkingStock.rows);
      return res.status(404).send("already existed")
    }

    const result = await pool.query(
      'INSERT INTO watchlist (user_id, stock_id) VALUES ($1, $2) RETURNING *',
      [userId, stockId]
    );
   const watchlist_id = result.rows[0].watchlist_id;
   console.log();
    pool.query( 'insert into transactions (user_id, stock_id, watchlist_id,   date_added) values ($1, $2, $3, CURRENT_TIMESTAMP )' , [userId, stockId,watchlist_id])


    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// const deleteStockFromWatchlist = async (req, res) => {
//   const userId = req.user.userId;
//   console.log('deleteStockFromWatchlist-API-req.user.userId',req.user.userId);
//   const  {stockId}  = req.body;
//   console.log('deleteStockFromWatchlist-API-req.body', req.body);
//   try {
//     const result = await pool.query(
//       'DELETE FROM watchlist WHERE user_id = $1 AND stock_id = $2 RETURNING *',
//       [userId, stockId]
//     );
    
//     if (result.rows.length > 0) {
//       'deleteStockFromWatchlist-API-result.rows[0]',result.rows[0]
//       res.status(200).json({ message: 'Stock removed from watchlist', stock: result.rows[0] });
//     } else {
//       res.status(404).json({ message: 'Stock not found in watchlist' });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server error');
//   }
// };


const deleteStockFromWatchlist = async (req, res) => {
  const userId = req.user.userId;
  const { stockId, watchlistId} = req.body;
  console.log('body',req.body);

  try {
    const result = await pool.query(
      'DELETE FROM watchlist WHERE user_id = $1 AND stock_id = $2 and watchlist_id = $3 RETURNING *',
      [userId, stockId,watchlistId]
    );
    pool.query('select * from transactions WHERE user_id = $1 AND stock_id = $2 and watchlist_id = $3', [userId, stockId,watchlistId] )


    console.log('Recently deleted stock:',result.rows[0]);
    res.status(201).json({
      message:result.rows[0].stock_id
    }

    );
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


module.exports = {
  getWatchlist,
  addStockToWatchlist,
  deleteStockFromWatchlist,
};
