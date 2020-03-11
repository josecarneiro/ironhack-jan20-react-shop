import axios from 'axios';

const instance = axios.create({
  baseURL: '/api'
});

const createIntent = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/purchase/create-intent', data)
      .then(result => {
        resolve(result.data);
      })
      .catch(reject);
  });

const finalize = data =>
  new Promise((resolve, reject) => {
    instance
      .post('/purchase/finalize', data)
      .then(result => {
        resolve(result.data);
      })
      .catch(reject);
  });

export { createIntent, finalize };
