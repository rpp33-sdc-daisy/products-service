const request = require('supertest');
const app = require('./server.js');

describe('Products API Unit Tests', () => {
  test('GET /products retrieves a list of products', async () => {
    await request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        console.log(err);
      });
  });

  test('GET /products/:product_id returns all product level information for a specified product id', async () => {

  });

  test('GET /products/:product_id/styles returns the all styles available for the given product', async () => {

  });
});
