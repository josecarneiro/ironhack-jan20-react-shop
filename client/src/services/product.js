import axios from 'axios';
import ProductItem from '../components/ProductItem';

const instance = axios.create({
  baseURL: '/api'
});

// const list = () =>
//   new Promise((resolve, reject) => {
//     instance
//       .get('/product/list')
//       .then(result => {
//         const products = result.data.products;
//         resolve(products);
//       })
//       .catch(reject);
//   });

const list = async () => {
  try {
    const result = await instance.get('/product/list');
    const products = result.data.products;
    return products;
  } catch (error) {
    throw error;
  }
};

// const load = id =>
//   new Promise((resolve, reject) => {
//     instance
//       .get(`/product/${id}`)
//       .then(result => {
//         const product = result.data.product;
//         resolve(product);
//       })
//       .catch(reject);
//   });

const load = async id => {
  const result = await instance.get(`/product/${id}`);
  const product = result.data.product;
  return product;
};

export { list, load };
