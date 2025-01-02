// app.js
const express = require('express');
const bodyParser = require('body-parser');
const watchlistRoutes = require('./routes/watchlist');
const stocksRoutes = require('./routes/stocks');
const authRoutes = require('./routes/auth');
const cors =require('cors')

const app = express();
const PORT = 3000;
app.use(cors())
app.use(bodyParser.json());

app.use('/api/watchlist', watchlistRoutes);
app.use('/api/stocks', stocksRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
