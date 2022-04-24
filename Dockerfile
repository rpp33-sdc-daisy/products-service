FROM node:17.7.1

WORKDIR /products

COPY package.json /products/package.json

RUN npm install

COPY . /products

CMD ["npm", "run", "start"]
