# products-service
The main goal of this project was to create a backend system that could support the increased traffic and data volume of an exisiting front-end retail application.

The back end system was broken into three micro-services (products, rating and reviews and questions and answers).

This repository is for the products service, which currently includes a database for product data and an API. The API supports 3 endpoints: GET returns all product data, GET returns product data given a product id, GET returns all styles given product id.

This project is currently in progress.

Next Steps:
Deploy API via AWS EC2
Scale system architecture to support up to 10k requests per second