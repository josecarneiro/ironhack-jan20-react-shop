'use strict';

const express = require('express');
const { Router } = express;

const router = new Router();

const database = require('./../database');

router.get('/list', (req, res, next) => {
  const products = database.products;
  res.json({ products });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const product = database.products.find(item => item.id === id);
  res.json({ product });
});

module.exports = router;
