/* eslint-disable max-len */
const express = require('express');
const { Client } = require('pg');

// eslint-disable-next-line import/extensions
const { getAllProducts, getProduct, getStyles } = require('./queries.js');

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
    .then((queryResponse) => {
      client.end();
      res.send(queryResponse.rows);
    })
    .catch((err) => console.log('Error recieved when retrieving all products', err));
});

// GET /products/:product_id
// Returns all product level information for a specified product id.

// GET /products/:product_id/styles
// Returns the all styles available for the given product.

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
