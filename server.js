const express = require('express');
const { Client } = require('pg');

const {
  getAllProducts, getProduct, getStyles, getAllFeatures,
} = require('./queries.js');

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
  client.query(getAllProducts)
    .then((response) => {
      const products = response.rows;
      client.end();
      res.send(products);
    })
    .catch((err) => {
      console.log('Error recieved when retrieving all products', err);
      res.send(404);
    });
});

// GET /products/:product_id
// Returns all product level information for a specified product id.

// GET /products/:product_id/styles
// Returns the all styles available for the given product.

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

exports.app = app;
exports.server = server;
