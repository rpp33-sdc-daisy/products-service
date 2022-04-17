/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 400,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 15000,
      maxVUs: 20000,
    },
  },
};

export default function () {
  http.get('http://127.0.0.1:3000/products');
  sleep(1);
}
