const request = require('supertest');
const app = require('../App');
const {
  Category,
  Role,
  User,
  Product
} = require('../models');
const { sequelize } = require('../models');
const db = require('../models');
const bcrypt = require("bcrypt");

// Pfad zur API
const path = '/api/'




beforeEach(async () => {
  //Rollen erstellen
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

describe('GET /categories', () => {

  it('should return a response with status 200', async () => {

    const response = await request(app).get(path + 'categories');

    expect(response.status).toBe(200);
  });

  it('should return array with data', async () => {
    await Category.bulkCreate([
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test', description: 'test' },
    ]);

    const response = await request(app).get(path + 'categories');

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.length).toBe(2);

  });

  it('should return array with category objects', async () => {
    await Category.bulkCreate([
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

  it('should return a response with status 401 when the user is not logged in', async () => {
    await Category.bulkCreate([
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test', description: 'test' },
    ]);

    const response = await request(app)
      .get(path + 'categories/1')

    expect(response.status).toBe(401);
  });

  it('should return a response with status 200 when the user is logged in and there is a category with the id', async () => {
    await Category.bulkCreate([
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test', description: 'test' },
    ]);

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')


    const response = await agent
      .get(path + 'categories/1')

    expect(response.status).toBe(200);
  });

  it('should return the right category object when the id is right ', async () => {
    const category = {
      id: 1,
      name: 'test',
      description: 'test',
    };
    await Category.create(category);

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')


    const response = await agent.get(path + 'categories/1');
    expect(response.body).toMatchObject(category);
  });

  it('should return a reponse with status 404 when there is no category with this id', async () => {
    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const response = await agent.get(path + 'categories/1');
    expect(response.status).toBe(404);
  });

  it('should return a reponse with status 400 when the id is not a number', async () => {
    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const response = await agent.get(path + 'categories/sadac');
    expect(response.status).toBe(400);
  });

});

describe('POST /categories/', () => {
  it('should return a response with status 401 when the user is not logged in', async () => {
    const category =
    {
      name: "test",
      description: "test",
    }

    const response = await request(app)
      .post(path + 'categories/')
      .send(category)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(401);
  });

  it('should return a response with status 201 when there is an category was created successfully', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const category =
    {
      name: "test",
      description: "test",
    }

    const response = await agent
      .post(path + 'categories/')
      .send(category)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);
  });

  it('should create a category in the DB based on the data', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const category = {
      id: 1,
      name: "test",
      description: "test",
    };

    const response = await agent
      .post(path + 'categories/')
      .send(category)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(201);

    const createdCategory = await Category.findOne({
      where: { id: category.id },
    });

    expect(createdCategory).toMatchObject(category);
  });

  it('should response with status 400 when validation fails', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const category = {
      id: 1,
      description: "test",
    };

    const response = await agent
      .post(path + 'categories/')
      .send(category)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);
  });

});

describe('PUT /categories/:id', () => {
  it('should return a response with status 401 when the user is not logged in', async () => {
    const category = await Category.create({
      name: "test",
      description: "test",
    });

    const response = await request(app)
      .put(path + 'categories/' + category.id)
      .send(category)
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(401);
  });

  it('should return a response with status 200 when the user is logged in', async () => {

    const agent = request.agent(app);

    await agent
      .post(`${path}users/login`)
      .send({
        name: "test",
        password: "test"
      })


    const originalCategory = await Category.create({
      name: "original-name",
      description: "original-description"
    });

    const updateData = {
      name: "updated-name",
      description: "updated-description"
    };

    const response = await agent
      .put(`${path}categories/${originalCategory.id}`)
      .send(updateData)
      .expect(200);

  });

  it('should update the correct category in the database', async () => {

    const agent = request.agent(app);

    await agent
      .post(`${path}users/login`)
      .send({ name: "test", password: "test" })


    const originalCategory = await Category.create({
      name: "originalName",
      description: "originalDescription"
    });

    const updatedData = {
      name: "newName",
      description: "newDescription"
    };

    const response = await agent
      .put(`${path}categories/${originalCategory.id}`)
      .send(updatedData)
      .expect(200);

    const updatedCategory = await Category.findByPk(originalCategory.id);

    expect(updatedCategory.name).toBe(updatedData.name);
    expect(updatedCategory.description).toBe(updatedData.description);


  });

  it('should update the correct category in the database', async () => {

    const agent = request.agent(app);

    await agent
      .post(`${path}users/login`)
      .send({ name: "test", password: "test" })


    const originalCategory = await Category.create({
      name: "originalName",
      description: "originalDescription"
    });

    const updatedData = {
      name: "newName",
      description: "newDescription"
    };

    const response = await agent
      .put(`${path}categories/${originalCategory.id}`)
      .send(updatedData)
      .expect(200);

    const updatedCategory = await Category.findByPk(originalCategory.id);

    expect(updatedCategory.name).toBe(updatedData.name);
    expect(updatedCategory.description).toBe(updatedData.description);


  });

  it('should return a response with status 404 when updating a non-existent category', async () => {
    const agent = request.agent(app);

    await agent
      .post(`${path}users/login`)
      .send({ name: "test", password: "test" })

    const nonExistentId = 9999;

    await agent
      .put(`${path}categories/${nonExistentId}`)
      .send({ name: "test", description: "test" })
      .expect(404);

  });

});

describe('GET /categories/name/:categoryName', () => {
  it('should return a response with status 200 when the category exists', async () => {
    const category = await Category.create({
      name: "test",
      description: "test",
    });

    const response = await request(app)
      .get(path + 'categories/name/' + category.name)

    expect(response.status).toBe(200);
  });

  it('should return a response with status 404 when the category does not exists', async () => {
    const category = await Category.create({
      name: "test",
      description: "test",
    });

    const response = await request(app)
      .get(path + 'categories/name/test122')

    expect(response.status).toBe(404);
  });

  it('should return a category object', async () => {
    const category = await Category.create({
      name: "test",
      description: "test",
    });

    const response = await request(app)
      .get(path + 'categories/name/' + category.name)


    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("description");
    expect(response.body).toHaveProperty("products");

    expect(Array.isArray(response.body.products)).toBe(true);
  });

  it('should return the right category object', async () => {
    const category = await Category.create({
      name: "test",
      description: "test",
    });

    const response = await request(app)
      .get(path + 'categories/name/' + category.name)


    expect(response.body.id).toBe(category.id);
    expect(response.body.name).toBe(category.name);
    expect(response.body.description).toBe(category.description);
  });

  it('should return the category only with active products', async () => {
    const category = await Category.create({
      name: "test",
      description: "test",
    });

    await Product.create({
      name: "test",
      description: "test",
      quantity: 1,
      sku : 2,
      image_url: "test",
      category_id: category.id,
      price: 10,
      is_active: true
    });

    await Product.create({
      name: "test",
      description: "test",
      sku: 1,
      quantity: 1,
      image_url: "test",
      category_id: category.id,
      price: 10,
      is_active: false
    });

    const response = await request(app)
      .get(path + 'categories/name/' + category.name)


    expect(response.body.products.length).toBe(1);
  });


});