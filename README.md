# products-service

The main goal of this project was to create a backend system that could support the increased traffic and data volume of an existing front-end retail application.

The back end system was broken into three micro-services (products, rating and reviews and questions and answers).

This repository is for the products service, which currently includes a database for product data and an API. The API supports 3 endpoints: GET returns all product data, GET returns product data given a product id, GET returns all styles given a product id.



### List Products

```GET /products``` Retrieves the list of products.

| Parameter  | Type     | Description |
| ---------- | -------- | ------------|
| page       | integer  | Selects the page of results to return. Default 1.
| count      | integer  | Specifies how many results per page to return. Default 5. |



### Product Information

```GET /products/:product_id``` Returns all product level information for a specified product id.

| Parameter  | Type     | Description |
| ---------- | -------- | ------------|
| product_id | integer  | Required ID of the Product requested |



### Product Styles

```GET /products/:product_id/styles``` Returns the all styles available for the given product.

| Parameter  | Type     | Description |
| ---------- | -------- | ------------|
| page       | integer  | Selects the page of results to return. Default 1. |
| count      | integer  | Specifies how many results per page to return. Default 5. |



## Technologies Used:
- PostgreSQL
- Node.js
- Express
- NGINX
- Redis
- AWS EC2
- New Relic
- Loader.io
- Supertest



## System Architecture:
![System Architechture Diagram](https://i.imgur.com/j0qNQCZ.png)
