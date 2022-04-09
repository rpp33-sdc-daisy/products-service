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
      .expect(400)
      .then((res) => {
        expect(res.error.text).toBe('Products not found');
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });
});

describe('GET /products/:product_id returns all product level information for a specified product id', () => {
  let product;
  beforeAll(async () => {
    await request(app)
      .get('/products/45')
      .expect(200)
      .then((res) => {
        product = res.body;
      })
      .catch((err) => {
        expect(err).toBe(undefined);
      });
  });

  test('product data is an object', () => {
    expect(typeof product).toBe('object');
  });

  test('product has correct id number', () => {
    expect(product.id).toBe(45);
  });

  test('product data has the expected properties', () => {
    const productProperties = ['id', 'name', 'category', 'slogan', 'description', 'features'];
    productProperties.forEach((productProperty) => {
      expect(product).toHaveProperty(productProperty);
    });
  });

  test('product features is an array', () => {
    expect(Array.isArray(product.features)).toBe(true);
  });

  test('product features has the expected properties', () => {
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

  test('products styles is an object', () => {
    expect(typeof styles).toBe('object');
  });

  test('product styles has the expected properties', () => {
    const stylesProperties = ['product_id', 'results'];
    stylesProperties.forEach((styleProperty) => {
      expect(styles).toHaveProperty(styleProperty);
    });
  });

  test('product style results has the expected properties', () => {
    const stylesResultsProperties = ['style_id', 'name', 'original_price', 'sale_price', 'default?', 'photos', 'skus'];
    stylesResultsProperties.forEach((styleResultsProperty) => {
      expect(styles.results[0]).toHaveProperty(styleResultsProperty);
    });
  });

  test('products skus is an object', () => {
    expect(typeof styles.results[0].skus).toBe('object');
  });

  test('products skus has the expected properties', () => {
    const skusProperties = ['quantity', 'size'];
    const skuId = Object.keys(styles.results[0].skus)[0];
    skusProperties.forEach((skusProperty) => {
      expect(styles.results[0].skus[skuId]).toHaveProperty(skusProperty);
    });
  });

  test('product photos is an array', () => {
    expect(Array.isArray(styles.results[0].photos)).toBe(true);
  });

  test('product photos has the expected properties', () => {
    const photoProperties = ['thumbnail_url', 'url'];
    photoProperties.forEach((photoProperty) => {
      expect(styles.results[0].photos[0]).toHaveProperty(photoProperty);
    });
  });
});
