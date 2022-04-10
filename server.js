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
  const page = (req.query.page || 0) * 20;
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

const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app, server };
