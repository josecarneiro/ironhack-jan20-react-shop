import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/purchase'
});

const list = async () => {
  const result = await instance.get('/list');
  const purchases = result.data.purchases;
  return purchases;
};

const create = async ids => {
  await instance.post('/create', { products: ids });
};

export { list, create };
