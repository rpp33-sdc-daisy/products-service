const request = require('supertest');
const { app, server } = require('./server.js');

afterAll(() => {
  server.close();
});

describe('GET /products retrieves a list of products', () => {
  let products;
  let product;
  beforeAll(async () => {
    await request(app)
      .get('/products')
      .expect(200)
      .then((res) => {
        products = res.body;
        [product] = products;
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });

  test('products data is an array', () => {
    expect(Array.isArray(products)).toBe(true);
  });

  test('product data is an object', () => {
    expect(typeof product).toBe('object');
  });

  test('product data has the expected properties', async () => {
    const productProperties = ['id', 'name', 'category', 'slogan', 'description', 'default_price'];
    productProperties.forEach((productProperty) => {
      expect(product).toHaveProperty(productProperty);
    });
  });

  test('returns different products when count and page parameters are specified', async () => {
    let updatedProduct;
    await request(app)
      .get('/products?count=12&page=12')
      .expect(200)
      .then((res) => {
        [updatedProduct] = res.body;
        expect(updatedProduct.id).not.toBe(product.id);
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });

  test('returns error with invalid parameters', async () => {
    let updatedProduct;
    await request(app)
      .get('/products?count=-1')
      .expect(400)
      .then((res) => {
        expect(res.error.text).toBe('Error: Please make sure you are entering valid parameters.');
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });

  test('returns error when products not found', async () => {
    let updatedProduct;
    await request(app)
      .get('/products?page=1000000000')
      .expect(404)
      .then((res) => {
        expect(res.error.text).toBe('Products not found');
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });
});
