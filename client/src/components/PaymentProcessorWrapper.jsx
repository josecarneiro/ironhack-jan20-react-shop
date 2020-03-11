import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, ElementsConsumer, CardElement } from '@stripe/react-stripe-js';

const StripeWrapper = ({ apiKey: key, secretKey, children }) => {
  const stripePromise = loadStripe(key);
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ stripe, elements }) => {
          const issueRequest = () =>
            new Promise((resolve, reject) => {
              stripe
                .confirmCardPayment(secretKey, {
                  payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                      name: 'Jenny Rosen'
                    }
                  }
                })
                .then(data => {
                  const { error, paymentIntent } = data;
                  if (error) {
                    reject(error);
                  } else {
                    resolve(paymentIntent);
                  }
                })
                .catch(reject);
            });

          return React.cloneElement(children, {
            stripe,
            ready: !!stripe,
            elements,
            issueRequest
          });
        }}
      </ElementsConsumer>
    </Elements>
  );
};

export default StripeWrapper;
