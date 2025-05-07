jest.setTimeout(30000); // Set timeout to 30 seconds for all tests

const request = require('supertest');
const { app, mongoose } = require('./index');
const Progress = require('./models/progress');

let server;
let testUserId;

beforeAll(async () => {
  console.log('Starting test setup...');
  server = app.listen(5001);
  console.log('Test server running on port 5001');
  await mongoose.connection.dropDatabase(); // Clear database before tests
});

afterAll(async () => {
  console.log('Starting test teardown...');
  await mongoose.connection.dropDatabase(); // Clean up after tests
  await mongoose.connection.close();
  await server.close();
  console.log('Test teardown complete.');
});

describe('API Endpoints', () => {
  it('should return a success message for the root endpoint', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Fitnity Backend is running!');
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/users/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User registered successfully');
  });

  it('should log in a user', async () => {
    const res = await request(app)
      .post('/api/users/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Login successful');
    testUserId = res.body.user.id; // Save the user ID for later tests

    // Create test progress data after successful login
    if (testUserId) {
      const testProgress = new Progress({
        userId: testUserId,
        weight: 70,
        caloriesBurned: 500,
        steps: 8000
      });
      await testProgress.save();
    }
  });

  it('should fetch progress for a user', async () => {
    expect(testUserId).toBeDefined();
    const res = await request(app).get(`/api/progress/${testUserId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('progress');
  });

  it('should fetch all subscriptions', async () => {
    const res = await request(app).get('/api/subscriptions');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('subscriptions');
  });

  // Added test for missing JWT_SECRET
  it('should fail to start if JWT_SECRET is not set', async () => {
    const originalEnv = process.env.JWT_SECRET;
    delete process.env.JWT_SECRET;

    const { app } = require('./index');
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(500);

    process.env.JWT_SECRET = originalEnv; // Restore original value
  });
});