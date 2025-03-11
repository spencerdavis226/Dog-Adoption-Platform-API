const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');

// Before running tests, clear the User collection
before(async () => {
  await User.deleteMany({});
});

describe('User Endpoints', () => {
  // Test for user registration
  it('should register a new user', async () => {
    const res = await request(app).post('/api/users/register').send({
      name: 'Test User',
      email: 'test@google.com',
      password: 'password123',
    });
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property(
      'message',
      'User registered successfully'
    );
  });

  // Test for user login
  it('should login an existing user and return a token', async () => {
    // Make sure user exists
    await request(app).post('/api/users/register').send({
      name: 'Login User',
      email: 'login@google.com',
      password: 'password123',
    });
    // Attempt to log in
    const res = await request(app).post('/api/users/login').send({
      email: 'login@google.com',
      password: 'password123',
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('token');
  });
});
