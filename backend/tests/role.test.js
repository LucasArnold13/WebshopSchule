const request = require('supertest');
const app = require('../App');
const {
  Role,
  User
} = require('../models');
const { sequelize } = require('../models');
const db = require('../models');
const bcrypt = require("bcrypt");

// Pfad zur API
const path = '/api/'

beforeEach(async () => {
  await Role.bulkCreate([
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
  ]);


  await User.create(
    {
      name: 'test',
      email: 'john@example.com',
      password: await bcrypt.hash("test", 10),
      role_id: 1,
      is_active: true
    }
  );

});


afterEach(async () => {
  // Alle Tabellen leeren
  for (const model of Object.keys(db)) {
    if (db[model].destroy) {
      await db[model].destroy({ truncate: true, cascade: true });
    }
  }
});

afterAll(async () => {
  await sequelize.close();
});


describe('GET /roles', () => {
  it('should return a response with status 200 when the user is logged in', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const response = await agent.get(path + 'roles');
    expect(response.status).toBe(200);
  });

  it('should return a response with status 401 when the user is not logged in', async () => {

    const response = await request(app).get(path + 'roles');
    expect(response.status).toBe(401);
  });


  it('should return an array with data', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const response = await agent.get(path + 'roles');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return an array with role objects', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const response = await agent.get(path + 'roles');

    response.body.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
    });

  });

});