import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/payment-method'
});

const list = async () => {
  const result = await instance.get('/list');
  const paymentMethods = result.data.paymentMethods;
  return paymentMethods;
};

const create = async token => {
  await instance.post('/create', { token });
};

export { list, create };
