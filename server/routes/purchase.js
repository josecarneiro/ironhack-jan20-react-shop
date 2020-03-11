'use strict';

const express = require('express');
const stripe = require('stripe');
const { Router } = express;

const router = new Router();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;

router.post('/create-intent', async (req, res, next) => {
  const amount = 1099;
  const currency = 'eur';
  const paymentIntent = await stripe(STRIPE_SECRET_KEY).paymentIntents.create({
    amount,
    currency,
    metadata: { integration_check: 'accept_a_payment' }
  });
  const secret = paymentIntent.client_secret;
  console.log(paymentIntent);
  res.json({ secret });
});

router.post('/finalize', (req, res, next) => {
  const { name, address, card } = req.body;
  console.log(name, address, card);
  res.json({ name, address });
});

module.exports = router;
