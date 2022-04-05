const request = require('supertest');
const { app } = require('./server.js');

describe('Products API Unit Tests', () => {
  test('GET /products retrieves a list of products', async () => {
    await request(app)
      .get('/products')
      .expect(200)
      .then((err, res) => {
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
        expect(typeof product.styles.photos).toBe('array');

        /* SKUS */
        expect(typeof product.styles.skus).toBe('array');

        /* FEATURES */
        expect(typeof product.features).toBe('array');
        const featuresProperties = ['feature', 'value'];
        featuresProperties.forEach((featureProperty) => {
          expect(product.features).toHaveProperty(featureProperty);
        });
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });

  test('GET /products/:product_id returns all product level information for a specified product id', async () => {
    await request(app)
      .get('/products/45')
      .expect(200)
      .then((err, res) => {
        if (err) console.log(err);
        const product = res.body;

        /* PRODUCTS */
        expect(typeof products).toBe('array');
        expect(typeof product).toBe('object');

        const productProperties = ['product_id', 'product_name', 'category', 'slogan', 'description', 'features', 'styles'];
        productProperties.forEach((productProperty) => {
          expect(product).toHaveProperty(productProperty);
        });

        /* STYLES */
        expect(typeof product.styles).toBe('array');
        expect(typeof product.styles.photos).toBe('array');

        /* SKUS */
        expect(typeof product.styles.skus).toBe('array');

        /* FEATURES */
        expect(typeof product.features).toBe('array');
        const featuresProperties = ['feature', 'value'];
        featuresProperties.forEach((featureProperty) => {
          expect(product.features).toHaveProperty(featureProperty);
        });
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });

  test('GET /products/:product_id/styles returns the all styles available for the given product', async () => {
    await request(app)
      .get('/products/45/styles')
      .expect(200)
      .then((err, res) => {
        const styles = res.body;

        /* STYLES */
        expect(typeof styles).toBe('array');
        const styleProperties = ['style_id', 'name', 'original_price', 'sale_price', 'photos', 'skus'];
        styleProperties.forEach((styleProperty) => {
          expect(styles).toHaveProperty(styleProperty);
        });

        /* SKUS */
        expect(typeof styles.skus).toBe('array');
        const skusProperties = ['sku_id', 'quantity', 'size'];
        skusProperties.forEach((skusProperty) => {
          expect(styles).toHaveProperty(skusProperty);
        });
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });
});
