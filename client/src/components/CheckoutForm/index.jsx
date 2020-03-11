import React, { Component } from 'react';
import { CardElement } from '@stripe/react-stripe-js';

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      },
      height: '64px'
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      address: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleInputChange({ target: { value, name } }) {
    this.setState({
      [name]: value
    });
  }

  handleSubmission(event) {
    event.preventDefault();
    const { name, address } = this.state;
    this.props
      .issueRequest()
      .then(data => {
        this.props.handlePurchase({
          name,
          address,
          card: data.id
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Checkout</h1>
        <form onSubmit={this.handleSubmission}>
          <label htmlFor="name"></label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            placeholder="Full Name"
          />
          <label htmlFor="address"></label>
          <input
            type="text"
            id="address"
            name="address"
            value={this.state.address}
            onChange={this.handleInputChange}
            placeholder="Address"
          />
          <CardElement options={CARD_ELEMENT_OPTIONS} />
          <button>Purchase</button>
        </form>
      </div>
    );
  }
}

export default CheckoutForm;
