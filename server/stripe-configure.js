const stripe = require('stripe');
const stripeInstance = stripe(process.env.STRIPE_SECRET_KEY);

module.exports = stripeInstance;
