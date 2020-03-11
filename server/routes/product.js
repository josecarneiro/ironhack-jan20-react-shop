'use strict';

const express = require('express');
const { Router } = express;

const router = new Router();
const Product = require('./../models/product');

router.get('/list', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const product = await Product.findById(id);
    res.json({ product });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
