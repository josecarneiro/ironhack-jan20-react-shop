'use strict';

const express = require('express');
const { Router } = express;

const router = new Router();

const stripe = require('stripe');
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

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
    const customer = await stripeInstance.customers.create({
      payment_method: token
    });
    // console.log(customer);
    const customerId = customer.id;
    const paymentMethod = await PaymentMethod.create({
      token: customerId,
      owner: req.user._id
    });

    // console.log(paymentMethod);

    // const charge = await stripeInstance.charges.create({
    //   amount: 5089,
    //   currency: 'eur',
    //   customer: paymentMethod.token
    //   // source: 'src_18eYalAHEMiOZZp1l9ZTjSU0'
    // });

    // console.log(charge);
    res.json({});
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
