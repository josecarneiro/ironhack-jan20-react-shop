'use strict';

const express = require('express');
const { Router } = express;

const router = new Router();

const stripe = require('stripe');
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

const Purchase = require('./../models/purchase');
const Product = require('./../models/product');
const PaymentMethod = require('./../models/payment-method');

router.get('/list', async (req, res, next) => {
  try {
    const purchases = await Purchase.find({ user: req.user._id });
    res.json({ purchases });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  const { products: productIds } = req.body;
  try {
    const products = await Product.find({ _id: productIds });
    const amount = products.reduce((total, product) => total + product.price.amount, 0);
    const paymentMethod = await PaymentMethod.findOne({ owner: req.user._id });
    const purchase = await Purchase.create({
      user: req.user._id,
      products: productIds,
      price: { amount, currency: 'EUR' },
      charged: false
    });

    // const charge = await stripeInstance.charges.create({
    //   amount,
    //   currency: 'EUR',
    //   customer: paymentMethod.token
    //   // source: 'src_18eYalAHEMiOZZp1l9ZTjSU0'
    // });

    console.log(`Purchase of ${amount} being made to customer ${paymentMethod.token}`);

    await purchase.update({ charged: true });

    console.log(purchase);

    res.json({ purchase });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
