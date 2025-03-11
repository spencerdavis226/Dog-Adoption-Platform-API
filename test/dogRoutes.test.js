const chai = require('chai');
const expect = chai.expect;
const request = require('supertest');
const app = require('../server');
const User = require('../models/User');
const Dog = require('../models/Dog');

let token;
let dogId;

describe('Dog Endpoints', function () {
  // Clear users and dogs. Register and login a test user
  before(async () => {
    // Clear existing users and dogs
    await User.deleteMany({});
    await Dog.deleteMany({});

    // Register a new user
    await request(app).post('/api/users/register').send({
      name: 'Dog Owner',
      email: 'owner@google.com',
      password: 'password123',
    });

    // Login to get a token
    const loginRes = await request(app)
      .post('/api/users/login')
      .send({ email: 'owner@google.com', password: 'password123' });

    token = loginRes.body.token;
  });

  describe('POST /api/dogs/register', () => {
    it('should register a new dog', async () => {
      const res = await request(app)
        .post('/api/dogs/register')
        .set('Authorization', `Bearer ${token}`)
        .send({ name: 'Gandolf', description: 'Literally the best dog ever' });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property(
        'message',
        'Dog registered successfully'
      );
      expect(res.body).to.have.property('dog');
      // Save the dog's ID for later tests
      dogId = res.body.dog._id;
    });
  });

  describe('POST /api/dogs/adopt/:dogId', () => {
    it('should adopt a dog', async () => {
      const res = await request(app)
        .post(`/api/dogs/adopt/${dogId}`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('message', 'Dog adopted successfully');
    });
  });

  describe('DELETE /api/dogs/remove/:dogId', () => {
    it('should not remove an adopted dog', async () => {
      const res = await request(app)
        .delete(`/api/dogs/remove/${dogId}`)
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property(
        'error',
        'Cannot remove an adopted dog'
      );
    });
  });

  describe('GET /api/dogs/registered', () => {
    it('should list registered dogs for the user', async () => {
      const res = await request(app)
        .get('/api/dogs/registered')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('dogs');
      expect(res.body.dogs).to.be.an('array');
    });
  });

  describe('GET /api/dogs/adopted', () => {
    it('should list adopted dogs for the user', async () => {
      const res = await request(app)
        .get('/api/dogs/adopted')
        .set('Authorization', `Bearer ${token}`)
        .send();

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('dogs');
      expect(res.body.dogs).to.be.an('array');
    });
  });
});
