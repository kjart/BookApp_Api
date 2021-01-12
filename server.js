const express = require('express');
const dotenv = require('dotenv');
// const logger = require('./middleware/logger');
const morgan = require('morgan');
const errorHandler = require('./middleware/error');

//Load env vars
dotenv.config({ path: './config/config.env' });

//set express
const app = express();

// Body parser
app.use(express.json());

//custom express logger
// app.use(logger);

//Dev logging third party middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Route files
const books = require('./routes/books');

// Mount routers
app.use('/api/v1/books', books);

// middleware comes after the route files
app.use(errorHandler);

//set the port
const PORT = process.env.PORT || 5000;

//Listen and connect to the server
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
