const request = require('supertest');
const app = require('./server.js');

describe('Products API Unit Tests', () => {
  test('GET /products retrieves a list of products', async () => {
    await request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        if (err) console.log(err);
        const products = res.body;
        const product = res.body[0];

        /* PRODUCTS */
        expect(typeof products).toBe('array');
        expect(typeof product).toBe('object');

        const productProperties = ['product_id', 'product_name', 'category', 'slogan', 'description', 'features', 'styles'];
        productProperties.forEach((productProperty) => {
          expect(product).toHaveProperty(productProperty);
        });

        /* STYLES */
        expect(typeof product.styles).toBe('array');
        const styleProperties = ['style_id', 'name', 'original_price', 'sale_price', 'photos', 'skus'];
        styleProperties.forEach((styleProperty) => {
          expect(product.styles).toHaveProperty(styleProperty);
        });
        expect(typeof product.styles.photos).toBe('array');

        /* SKUS */
        expect(typeof product.styles.skus).toBe('array');
        const skusProperties = ['sku_id', 'quantity', 'size'];
        skusProperties.forEach((skusProperty) => {
          expect(product.styles.skus).toHaveProperty(skusProperty);
        });

        /* FEATURES */
        expect(typeof product.features).toBe('array');
        const featuresProperties = ['feature', 'value'];
        featuresProperties.forEach((featureProperty) => {
          expect(product.features).toHaveProperty(featureProperty);
        });
      });
  });

  test('GET /products/:product_id returns all product level information for a specified product id', async () => {

  });

  test('GET /products/:product_id/styles returns the all styles available for the given product', async () => {

  });
});
