require('dotenv').config();
// const config = require('./config/Books');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const mongoose = require('mongoose');

const bookroutes = require('./routes/booksroutes');

const app = express();
app.use(express.json());
app.use(compression());
app.use(cors());
app.options('*', cors());
app.use('/', bookroutes);

function normalizePort(port) {
  if (typeof port === 'string') {
    return parseInt(port);
  } else if (typeof port === 'undefined') {
    return 9000;
  }
  return port;
}

try {
  const port = normalizePort(9000);
  app.listen(port, () => console.log(`Application running on port ${port}`));
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

mongoose
  .connect('mongodb://127.0.0.1:27017/bookshelf')
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to database');
      console.log('Server is running on port ' + process.env.PORT);
    });
  })
  .catch((error) => console.log(error));
