import React, { Component } from 'react';
import PaymentProcessorWrapper from './../../components/PaymentProcessorWrapper';
import CheckoutForm from './../../components/CheckoutForm';

import { createIntent, finalize as makePurchase } from './../../services/purchase';

const KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

class CheckoutView extends Component {
  constructor(props) {
    super(props);
    this.handlePurchase = this.handlePurchase.bind(this);
    this.state = {
      secretKey: null
    };
  }

  componentDidMount() {
    createIntent()
      .then(data => {
        this.setState({
          secretKey: data.secret
        });
      })
      .catch(console.log);
  }

  handlePurchase(data) {
    return makePurchase(data)
      .then(data => {
        console.log(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <PaymentProcessorWrapper apiKey={KEY} secretKey={this.state.secretKey}>
        <CheckoutForm handlePurchase={this.handlePurchase} />
      </PaymentProcessorWrapper>
    );
  }
}

export default CheckoutView;
