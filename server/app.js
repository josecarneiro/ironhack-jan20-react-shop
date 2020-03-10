'use strict';

const { join } = require('path');
const express = require('express');
const createError = require('http-errors');
const logger = require('morgan');

const productRouter = require('./routes/product');

const app = express();

app.use(express.static(join(__dirname, 'public')));
app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));

app.use('/api/product', productRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// Catch all error handler
app.use((error, req, res, next) => {
  // Set error information, with stack only available in development
  // res.locals.message = error.message;
  // res.locals.error = req.app.get('env') === 'development' ? error : {};
  res.status(error.status || 500);
  res.json({ error });
});

module.exports = app;
