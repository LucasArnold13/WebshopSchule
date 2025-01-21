const request = require('supertest');
const app = require('../App');
const {
  Category
} = require('../models');
const { sequelize } = require('../models');
const db = require('../models');

// Pfad zur API
const path = '/api/'

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

describe('GET /categories', () => {

  it('should return a response with status 200', async () => {
    const response = await request(app).get(path + 'categories');
    expect(response.status).toBe(200);
  });

  it('should return array with data', async () => {
    await sequelize.models.Category.bulkCreate([
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test', description: 'test' },
    ]);
    const response = await request(app).get(path + 'categories');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.length).toBe(2);

  });

  it('should return array with category objects', async () => {
    await sequelize.models.Category.bulkCreate([
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test', description: 'test' },
    ]);
    const response = await request(app).get(path + 'categories');
    response.body.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('description');
    });

  });

  it('should return an empty array when there is no data', async () => {
    const response = await request(app).get(path + 'categories');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);

  });

});

describe('GET /categories/:id', () => {
  it('should return a response with status 200 when there is an category with the id', async () => {
    await sequelize.models.Category.bulkCreate([
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test', description: 'test' },
    ]);

    const response = await request(app).get(path + 'categories/1');
    expect(response.status).toBe(200);
  });

  it('should return the right category object when the id is right ', async () => {
    let category = {
      id: 1,
      name: 'test',
      description: 'test',
    };
    await sequelize.models.Category.create(category);

    const response = await request(app).get(path + 'categories/1');
    expect(response.body).toMatchObject(category);
  });

  it('should return a reponse with status 404 when there is no category with this id', async () => {

    const response = await request(app).get(path + 'categories/1');
    expect(response.status).toBe(404);
  });

  it('should return a reponse with status 400 when the id is not a number', async () => {

    const response = await request(app).get(path + 'categories/sadac');
    expect(response.status).toBe(400);
  });
});

describe('POST /categories/', () => {
  it('should return a response with status 201 when there is an category was created successfully', async () => {
    let category =
    {
      name: "test",
      description: "test",
    }

    const response = await request(app)
      .post(path + 'categories/')
      .send(category)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
  });

});

describe('POST /categories/', () => {
  it('should return a category in the DB based on the data', async () => {
    let category = {
      id: 1,
      name: "test",
      description: "test",
    };

    const response = await request(app)
      .post(path + 'categories/')
      .send(category)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);

    const createdCategory = await sequelize.models.Category.findOne({
      where: { id: category.id },
    });

    expect(createdCategory).toMatchObject(category);
  });

});