'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  token: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  lastFourDigits: {
    type: String
  },
  brand: {
    type: String
  },
  country: {
    type: String
  },
  expirationDate: {
    year: {
      type: Number
    },
    month: {
      type: Number
    }
  }
});

module.exports = mongoose.model('PaymentMethod', schema);
