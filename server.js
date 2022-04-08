const express = require('express');
const { Client } = require('pg');

// http://127.0.0.1:8080/
const client = new Client({
  host: '127.0.0.1',
  database: 'products-service',
  password: 'password',
  port: 5432,
});

const app = express();
const port = 3000;

client.connect();

// GET /products Retrieves the list of products.
app.get('/products', (req, res) => {
  const count = req.query.count || 5;
  const page = (req.query.page || 0) * 20;
  console.log(page);
  const getAllProducts = `SELECT * FROM products LIMIT ${count} OFFSET ${page};`;
  client.query(getAllProducts)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('Error recieved when retrieving all products', err);
      res.send(404);
    });
});

// GET /products/:product_id returns all product level information for a specified product id.
app.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;
  const getProduct = `SELECT products.*, json_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features from products JOIN features ON products.id=features.product_id WHERE products.id=${productId} GROUP BY products.id;`;
  client.query(getProduct)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('Error recieved when retrieving all products', err);
      res.send(404);
    });
});
// GET /products/:product_id/styles returns the all styles available for the given product.
app.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  const getProduct = `SELECT products.id as product_id,
    json_agg(
      json_build_object(
        'style_id', styles.id, 'name', styles.name, 'original_price', styles.original_price, 'sale_price', styles.sale_price, 'default?', styles.default_style, 'photos', (
          SELECT
            json_agg(
              json_build_object(
                'thumbnail_url', photos.thumbnail_url,
                'url', photos.url
              )
            )
          FROM photos WHERE styles.id=photos.style_id
        )
      )
    )
    AS results from products
    LEFT JOIN styles ON products.id=styles.product_id
    WHERE products.id=${productId}
    GROUP BY products.id;`;

  client.query(getProduct)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.log('Error recieved when retrieving all products', err);
      res.send(404);
    });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

exports.app = app;
exports.server = server;
