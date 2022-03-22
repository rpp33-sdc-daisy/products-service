const express = require('express');
const postgres = require('postgres');

const app = express();
const port = 3000;

const db = postgres({
  host: '127.0.0.1',
  database: 'products-service',
  username: 'user',
  password: 'password',
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
