/* eslint-disable max-len */
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
// const productsQuery = 'CREATE TABLE products (product_id serial PRIMARY KEY, product_name VARCHAR(50), category VARCHAR(50), slogan VARCHAR(300), description VARCHAR(500), default_price VARCHAR(50))';

// COPY products (product_name, slogan, description, category, default_price) from '/Users/alyshagilliard/Downloads/product.csv' WITH (FORMAT csv,HEADER);

// const featuresQuery = 'CREATE TABLE features (id serial PRIMARY KEY, feature VARCHAR(50), product_id serial, value VARCHAR(50))';

// COPY features (id, product_id, feature, value) from '/Users/alyshagilliard/Downloads/features.csv' WITH (FORMAT csv, HEADER);

// const stylesQuery = 'CREATE TABLE styles (id serial PRIMARY KEY, name VARCHAR(50), sale_price VARCHAR(50), original_price VARCHAR(50), product_id serial, default_style VARCHAR(1))';

// COPY styles (id, product_id, name, sale_price, original_price, default_style) from '/Users/alyshagilliard/Downloads/styles.csv' WITH (FORMAT csv, HEADER);

// const photosQuery = 'CREATE TABLE photos (id serial PRIMARY KEY, style_id serial, thumbnail_url VARCHAR, url VARCHAR)';

// COPY photos (id, style_id, thumbnail_url, url) from '/Users/alyshagilliard/Downloads/photos.csv' WITH (FORMAT csv, HEADER);

client.query(photosQuery, (err, res) => {
  // Hello World!
  client.end();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
