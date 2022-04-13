require('dotenv').config();
const express = require('express');
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  database: 'products-service',
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const app = express();
const port = 3000;

client.connect();

// GET /products Retrieves the list of products.
app.get('/products', (req, res) => {
  const count = req.query.count || 5;
  const page = (req.query.page || 0) * count;
  const getAllProducts = `SELECT * FROM products LIMIT ${count} OFFSET ${page};`;
  client.query(getAllProducts)
    .then((response) => {
      if (response.rows.length === 0) throw new Error('Products not found', { cause: 'Products not found' });
      res.send(response.rows);
    })
    .catch((err) => {
      if (err.cause === 'Products not found') {
        res.status(404).send('Products not found');
      } else {
        res.status(400).send('Error: Please make sure you are entering valid parameters.');
      }
    });
});

// GET /products/:product_id returns all product level information for a specified product id.
app.get('/products/:product_id', (req, res) => {
  const productId = req.params.product_id;
  const getProduct = `SELECT products.*,
    json_agg(json_build_object('feature', features.feature, 'value', features.value)) AS features
    FROM products
    JOIN features ON products.id=features.product_id
    WHERE products.id=${productId}
    GROUP BY products.id;`;

  client.query(getProduct)
    .then((response) => {
      if (response.rows.length === 0) throw new Error('Product not found', { cause: 'Product not found' });
      res.send(response.rows[0]);
    })
    .catch((err) => {
      if (err.cause === 'Product not found') {
        res.status(404).send('Product not found: Please enter a different product id');
      } else {
        res.status(400).send('Error: The product id must be a number. Please try again.');
      }
    });
});

// GET /products/:product_id/styles returns the all styles available for the given product.
app.get('/products/:product_id/styles', (req, res) => {
  const productId = req.params.product_id;
  const getStyles = `SELECT products.id as product_id,
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
        ),
        'skus', (
          SELECT
          json_object_agg(skus.id,
            json_build_object(
              'quantity', skus.quantity,
              'size', skus.size
            )
          )
          FROM skus WHERE styles.id=skus.style_id
        )
      )
    )
    AS results FROM products
    LEFT JOIN styles ON products.id=styles.product_id
    WHERE products.id=${productId}
    GROUP BY products.id;`;

  client.query(getStyles)
    .then((response) => {
      if (response.rows.length === 0) throw new Error('Styles not found', { cause: 'Styles not found' });
      res.send(response.rows[0]);
    })
    .catch((err) => {
      if (err.cause === 'Styles not found') {
        res.status(404).send('Styles not found: Please enter a different product id');
      } else {
        res.status(400).send('Error: The product id must be a number. Please try again.');
      }
    });
});

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app, server };
