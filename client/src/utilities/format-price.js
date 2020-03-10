const currencyMap = {
  EUR: '€',
  USD: '$',
  GBP: '£'
};

const formatPrice = ({ value, currency }) => `${(value / 100).toFixed(2)}${currencyMap[currency]}`;

export default formatPrice;
