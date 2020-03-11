const currencyMap = {
  EUR: '€',
  USD: '$',
  GBP: '£'
};

const formatPrice = ({ amount, currency }) =>
  `${(amount / 100).toFixed(2)}${currencyMap[currency]}`;

export default formatPrice;
