/* eslint-disable no-unused-vars */

/* Products table queries */
const productsQuery = 'CREATE TABLE products (product_id serial PRIMARY KEY, product_name VARCHAR(50), category VARCHAR(50), slogan VARCHAR(300), description VARCHAR(500), default_price VARCHAR(50))';

const productsImportQuery = 'COPY products (product_name, slogan, description, category, default_price) from "/Users/alyshagilliard/Downloads/product.csv" WITH (FORMAT csv,HEADER)';

const getAllProducts = 'SELECT * from products';

const getProduct = (productId) => `SELECT * FROM products INNER JOIN features ON features.product_id=products.id WHERE products.id=${productId}`;

/* Features table queries */
const featuresQuery = 'CREATE TABLE features (id serial PRIMARY KEY, feature VARCHAR(50), product_id serial, value VARCHAR(50))';

const getAllFeatures = 'SELECT * from features';

const featuresImportQuery = 'COPY features (id, product_id, feature, value) from /Users/alyshagilliard/Downloads/features.csv" WITH (FORMAT csv, HEADER)';

/* Styles table queries */
const stylesQuery = 'CREATE TABLE styles (id serial PRIMARY KEY, name VARCHAR(50), sale_price VARCHAR(50), original_price VARCHAR(50), product_id serial, default_style VARCHAR(1))';

const stylesImportQuery = 'COPY styles (id, product_id, name, sale_price, original_price, default_style) from "/Users/alyshagilliard/Downloads/styles.csv" WITH (FORMAT csv, HEADER)';

/* Photos table queries */
const photosQuery = 'CREATE TABLE photos (id serial PRIMARY KEY, style_id serial, thumbnail_url VARCHAR, url VARCHAR)';

const photosImportQuery = 'COPY photos (id, style_id, thumbnail_url, url) from "/Users/alyshagilliard/Downloads/photos.csv" WITH (FORMAT csv, HEADER)';

/* Skus table queries */
const skusQuery = 'CREATE TABLE skus (id serial PRIMARY KEY, style_id serial, size VARCHAR(8), quantity INT)';

const skusImportQuery = 'COPY skus (id, style_id, size, quantity) from "/Users/alyshagilliard/Downloads/skus.csv" WITH (FORMAT csv, HEADER)';

const getStyles = (productId) => `SELECT * FROM styles WHERE product_id=${productId}`;

exports.getAllProducts = getAllProducts;
exports.getProduct = getProduct;
exports.getStyles = getStyles;
