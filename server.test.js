const request = require('supertest');
const app = require('./server.js');

describe('GET /products', () => {
  test('GET /products return 200', async () => {
    await request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        console.log(err);
      });
  });
});
