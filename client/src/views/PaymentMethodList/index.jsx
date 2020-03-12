import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { list as listPaymentMethods } from '../../services/payment-method';

import './style.scss';
class PaymentMethodView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentMethods: []
    };
  }

  async fetchData() {
    const paymentMethods = await listPaymentMethods();
    this.setState({ paymentMethods });
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    return (
      <div>
        <h3>Payment Methods</h3>
        {this.state.paymentMethods.map(method => (
          <div className="payment__method--card">
            <img src={`/card-brands/${method.brand}.png`} />
            <span>**** **** **** {method.lastFourDigits}</span>
            <span>
              {method.expirationDate.month}/{method.expirationDate.year}
            </span>
          </div>
        ))}
        <Link to="/payment-method/create">Add new Payment Method</Link>
      </div>
    );
  }
}

export default PaymentMethodView;
