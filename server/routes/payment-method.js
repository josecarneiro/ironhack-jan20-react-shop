'use strict';

const express = require('express');
const { Router } = express;

const router = new Router();

const stripe = require('./../stripe-configure');

const PaymentMethod = require('./../models/payment-method');

router.get('/list', async (req, res, next) => {
  try {
    const paymentMethods = await PaymentMethod.find({ owner: req.user._id });
    res.json({ paymentMethods });
  } catch (error) {
    next(error);
  }
});

router.post('/create', async (req, res, next) => {
  const { token } = req.body;
  try {
    const method = await stripe.paymentMethods.attach(token, {
      customer: req.user.stripeCustomerId
    });
    const paymentMethod = await PaymentMethod.create({
      token,
      owner: req.user._id,
      brand: method.card.brand,
      lastFourDigits: method.card.last4,
      country: method.card.card,
      expirationDate: {
        year: method.card.exp_year,
        month: method.card.exp_month
      }
    });
    res.json({});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
