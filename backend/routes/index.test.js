const request = require('supertest');
const express = require('express');
const router = require('./index');

const app = express();
app.use(express.json());
app.use('/', router);

describe('Backend API Tests', () => {
  it('should fetch all problems', async () => {
    const response = await request(app).get('/problems');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should fetch a specific problem by ID', async () => {
    const response = await request(app).get('/problems/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });

  it('should return 404 for a non-existent problem', async () => {
    const response = await request(app).get('/problems/999');
    expect(response.status).toBe(404);
  });

  it('should evaluate a solution correctly', async () => {
    const solutionCode = `function validateCallFlow(events) {
      const validSequence = ['REGISTER', 'INVITE', 'ACK', 'BYE'];
      let index = 0;
      for (const event of events) {
        if (event === validSequence[index]) {
          index++;
        } else if (validSequence.includes(event)) {
          return false;
        }
      }
      return index === validSequence.length;
    }`;

    const response = await request(app)
      .post('/solutions')
      .send({ problemId: 1, solutionCode });

    expect(response.status).toBe(200);
    expect(response.body.results).toBeDefined();
    expect(response.body.results.every(r => r.passed)).toBe(true);
  });

  it('should return 400 for an invalid solution', async () => {
    const solutionCode = `function invalidSolution(events) { return false; }`;

    const response = await request(app)
      .post('/solutions')
      .send({ problemId: 1, solutionCode });

    expect(response.status).toBe(200);
    expect(response.body.results).toBeDefined();
    expect(response.body.results.some(r => !r.passed)).toBe(true);
  });
});