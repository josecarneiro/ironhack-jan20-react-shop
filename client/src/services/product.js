import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3010'
});

const list = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/products')
      .then(result => {
        const products = result.data;
        resolve(products);
      })
      .catch(reject);
    // .catch(error => {
    //   reject(error);
    // });
  });

const load = id =>
  new Promise((resolve, reject) => {
    instance
      .get(`/products/${id}`)
      .then(result => {
        const product = result.data;
        resolve(product);
      })
      .catch(reject);
  });

export { list, load };
