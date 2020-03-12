import React, { Component } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { CardElement, Elements, ElementsConsumer } from '@stripe/react-stripe-js';

import { create as paymentMethodCreate } from '../../services/payment-method';

const STRIPE_PUBLIC_KEY = process.env.REACT_APP_STRIPE_PUBLIC_KEY;

class PaymentMethodView extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleFormSubmission = this.handleFormSubmission.bind(this);

    this.stripePromise = loadStripe(STRIPE_PUBLIC_KEY);
  }

  componentDidMount() {
    this.setState({});
  }

  async handleFormSubmission(event, stripe, elements) {
    event.preventDefault();
    const data = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    });
    const { error, paymentMethod } = data;
    if (error) {
      console.log(error);
    } else {
      // console.log(paymentMethod);
      await paymentMethodCreate(paymentMethod.id);
      this.props.history.push('/payment-method/list');
    }
  }

  render() {
    return (
      <div>
        <h3>Add new Payment Method</h3>
        <Elements stripe={this.stripePromise}>
          <ElementsConsumer>
            {({ stripe, elements }) => (
              <form onSubmit={event => this.handleFormSubmission(event, stripe, elements)}>
                {/* <label htmlFor="name">Name</label> */}
                <CardElement />
                <button>Add Payment Method</button>
              </form>
            )}
          </ElementsConsumer>
        </Elements>
      </div>
    );
  }
}

export default PaymentMethodView;
