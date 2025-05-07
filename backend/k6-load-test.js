import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 }, // ramp-up to 10 users
    { duration: '3m', target: 10 }, // stay at 10 users
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
};

export default function () {
  const res = http.get('http://localhost:5000/api/users');
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is < 200ms': (r) => r.timings.duration < 200,
  });
  sleep(1);
}