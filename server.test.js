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

  test('products data is an array', async () => {
    expect(Array.isArray(products)).toBe(true);
  });

  test('product data is an object', async () => {
    expect(typeof product).toBe('object');
  });

  test('product data has the expected properties', async () => {
    const productProperties = ['product_id', 'product_name', 'category', 'slogan', 'description', 'features'];
    productProperties.forEach((productProperty) => {
      expect(product).toHaveProperty(productProperty);
    });
  });

  test('product features is an array', async () => {
    expect(Array.isArray(product.features)).toBe(true);
    const featuresProperties = ['feature', 'value'];
    featuresProperties.forEach((featureProperty) => {
      expect(product.features[0]).toHaveProperty(featureProperty);
    });
  });

  test('product features has the expected properties', async () => {
    const featuresProperties = ['feature', 'value'];
    featuresProperties.forEach((featureProperty) => {
      expect(product.features[0]).toHaveProperty(featureProperty);
    });
  });
});

describe('GET /products/:product_id returns all product level information for a specified product id', () => {
  let products;
  let product;
  beforeAll(async () => {
    await request(app)
      .get('/products/45')
      .expect(200)
      .then((res) => {
        products = JSON.parse(res.res.text);
        [product] = products;
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });

  test('product data is an object', async () => {
    expect(typeof product).toBe('object');
  });

  test('product has correct id number', async () => {
    expect(product.product_id).toBe(45);
  });

  test('product data has the expected properties', async () => {
    const productProperties = ['product_id', 'product_name', 'category', 'slogan', 'description', 'features'];
    productProperties.forEach((productProperty) => {
      expect(product).toHaveProperty(productProperty);
    });
  });

  test('product features is an array', async () => {
    expect(Array.isArray(product.features)).toBe(true);
    const featuresProperties = ['feature', 'value'];
    featuresProperties.forEach((featureProperty) => {
      expect(product.features[0]).toHaveProperty(featureProperty);
    });
  });

  test('product features has the expected properties', async () => {
    const featuresProperties = ['feature', 'value'];
    featuresProperties.forEach((featureProperty) => {
      expect(product.features[0]).toHaveProperty(featureProperty);
    });
  });
});

describe('GET /products/:product_id/styles returns the all styles available for the given product', () => {
  let styles;
  beforeAll(async () => {
    await request(app)
      .get('/products/45/styles')
      .expect(200)
      .then((res) => {
        styles = res.body;
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });

  test('products styles is an array', () => {
    expect(Array.isArray(styles)).toBe(true);
  });

  test('products styles has the expected properties', () => {
    const styleProperties = ['style_id', 'name', 'original_price', 'sale_price', 'photos', 'skus'];
    styleProperties.forEach((styleProperty) => {
      expect(styles).toHaveProperty(styleProperty);
    });
  });

  test('products skus is an array', () => {
    expect(Array.isArray(styles.skus)).toBe(true);
  });

  test('products skus has the expected properties', () => {
    const skusProperties = ['sku_id', 'quantity', 'size'];
    skusProperties.forEach((skusProperty) => {
      expect(styles).toHaveProperty(skusProperty);
    });
  });
});
