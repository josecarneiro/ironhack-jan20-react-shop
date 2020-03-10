import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});

const list = () =>
  new Promise((resolve, reject) => {
    instance
      .get('/product/list')
      .then(result => {
        const products = result.data.products;
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
      .get(`/product/${id}`)
      .then(result => {
        const product = result.data.product;
        resolve(product);
      })
      .catch(reject);
  });

export { list, load };
