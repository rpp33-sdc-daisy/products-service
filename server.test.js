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
        products = JSON.parse(res.res.text);
        [product] = products;
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });
  test('products data has correct properties and data types', async () => {
    expect(Array.isArray(products)).toBe(true);
    expect(typeof product).toBe('object');

    const productProperties = ['product_id', 'product_name', 'category', 'slogan', 'description', 'features'];
    productProperties.forEach((productProperty) => {
      expect(product).toHaveProperty(productProperty);
    });
  });

  test('features data has correct properties and data types', async () => {
    expect(Array.isArray(product.features)).toBe(true);
    const featuresProperties = ['feature', 'value'];
    featuresProperties.forEach((featureProperty) => {
      expect(product.features[0]).toHaveProperty(featureProperty);
    });
  });
});
// test('GET /products/:product_id returns all product level information for a specified product id', async () => {
//   await request(app)
//     .get('/products/45')
//     .expect(200)
//     .then((err, res) => {
//       if (err) console.log(err);
//       const product = res.body;

//       /* PRODUCTS */
//       expect(typeof product).toBe('object');

//       const productProperties = ['product_id', 'product_name', 'category', 'slogan', 'description', 'features'];
//       productProperties.forEach((productProperty) => {
//         expect(product).toHaveProperty(productProperty);
//       });

//       /* FEATURES */
//       expect(Array.isArray(product.features)).toBe(true);
//       const featuresProperties = ['feature', 'value'];
//       featuresProperties.forEach((featureProperty) => {
//         expect(product.features).toHaveProperty(featureProperty);
//       });
//     })
//     .catch((err) => {
//       expect(err).toBe(undefined);
//     });
// });

// test('GET /products/:product_id/styles returns the all styles available for the given product', async () => {
//   await request(app)
//     .get('/products/45/styles')
//     .expect(200)
//     .then((err, res) => {
//       const styles = res.body;

//       /* STYLES */
//       expect(Array.isArray(styles)).toBe(true);
//       const styleProperties = ['style_id', 'name', 'original_price', 'sale_price', 'photos', 'skus'];
//       styleProperties.forEach((styleProperty) => {
//         expect(styles).toHaveProperty(styleProperty);
//       });

//       /* SKUS */
//       expect(Array.isArray(styles.skus)).toBe(true);
//       const skusProperties = ['sku_id', 'quantity', 'size'];
//       skusProperties.forEach((skusProperty) => {
//         expect(styles).toHaveProperty(skusProperty);
//       });
//     })
//     .catch((err) => {
//       expect(err).toBe(undefined);
//     });
// });