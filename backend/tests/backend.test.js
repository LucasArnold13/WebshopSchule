const request = require('supertest');
const app = require('../App');
const { User, Category } = require('../models'); // Beispielmodell für Benutzer
const { sequelize } = require('../models'); // Importiere die sequelize-Instanz
const db = require('../models'); // Importiere das gesamte db-Objekt


// Pfad zur API
const backend = '/api/backend/'



beforeEach(async () => {
  await sequelize.models.Role.bulkCreate([
    { id: 1, name: 'admin' },
    { id: 2, name: 'user' },
  ]);


});

afterEach(async () => {
  // Alle Tabellen leeren
  for (const model of Object.keys(db)) {
    if (db[model].destroy) {
      await db[model].destroy({ truncate: true, cascade: true });
    }
  }
});

//#region users
describe('GET /users', () => {

  it('should response with status 200', async () => {

    const response = await request(app).get(backend + 'users');
    console.log(response.body);
    expect(response.status).toBe(200);
  });



  it('should contain an Array with data', async () => {

    await sequelize.models.User.bulkCreate([
      { id: 1, name: 'John Doe', email: 'john@example.com', role_id: 1, is_active: true },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', role_id: 2, is_active: true },
    ]);

    const response = await request(app).get(backend + 'users');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should contain an array with user objects', async () => {

    await sequelize.models.User.bulkCreate([
      { id: 1, name: 'John Doe', email: 'john@example.com', role_id: 1, is_active: true },
      { id: 2, name: 'Jane Doe', email: 'jane@example.com', role_id: 2, is_active: true },
    ]);

    const response = await request(app).get(backend + 'users');
    response.body.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('email');
      expect(item).toHaveProperty('role_id');
      expect(item).toHaveProperty('is_active');
    });


  });

  it('should return an empty array when there is no data', async () => {

    const response = await request(app).get(backend + 'users');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(0);
  });


});


describe('GET /users/:id', () => {

  it('should return a response with status 200 when there is an user with the right id', async () => {

    await sequelize.models.User.create({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app).get(backend + 'users/1');
    expect(response.status).toBe(200);
  });


  it('should return a response with the correct user object when there is an user with the right id', async () => {

    await sequelize.models.User.create({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app).get(backend + 'users/1');
    expect(response.body).toMatchObject({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role_id: 1,
      is_active: true,
    });
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });


  it('should return a response with the correct user object that doesnt contain a password when there is an user with the right id', async () => {

    await sequelize.models.User.create({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app).get(backend + 'users/1');

    expect(response.body).toMatchObject({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role_id: 1,
      is_active: true,
    });
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
    expect(response.body).not.toHaveProperty('password');
  });

  it('should return a response with status 404 when there is no user with this id', async () => {

    await sequelize.models.User.create({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app).get(backend + 'users/100');

    expect(response.status).toBe(404);

  });

  it('should return a response with status 400 when the id is not a number', async () => {

    await sequelize.models.User.create({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app).get(backend + 'users/asdsd');

    expect(response.status).toBe(400);

  });


});


describe('PUT /users/:id', () => {

  it('should return a response with status 200 when the user is updatet', async () => {

    let user = await sequelize.models.User.create({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app).get(backend + 'users/' + user.id);

    expect(response.status).toBe(200);

  });


  it('should update the right user in the DB', async () => {

    let user = await sequelize.models.User.create({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app)
      .put(backend + 'users/' + 1)
      .send({
        id: 1,
        name: "test",
      })
      .set('Content-Type', 'application/json');

    const user1 = await User.findOne({
      where: { id: 1 },
      attributes: { exclude: ['password'] },
    });
    expect(user1.name).toBe("test");

  });

  it('should return a reponse with status 404 when there is no user with this ID', async () => {

    let user = await sequelize.models.User.create({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app)
      .put(backend + 'users/' + 2)
      .send({
        id: 1,
        name: "test",
      })
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(404);

  });

  it('should return a response with status 400 when the id is not a number', async () => {

    const response = await request(app)
    .put(backend + 'users/' + "ffsdsd")
    .send({
      id: 1,
      name: "test",
    })
    .set('Content-Type', 'application/json');

    expect(response.status).toBe(400);

  });
});


describe('POST /users', () => {

  it('should return a response with status 200 when the user was created successfully', async () => {

    let user = 
    {
      name :"test",
      email : "test",
      password : "test",
      role_id : 1,
      is_active : true
    }

    const response = await request(app)
    .post(backend + 'users/')
    .send(user)
    .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);

  });

  it('should create a user in the DB based on the data', async () => {
    const user = {
      name: "test",
      email: "test@example.com", 
      password: "test", 
      role_id: 1,
      is_active: true,
    };

    const response = await request(app)
      .post(backend + 'users/')
      .send(user)
      .set('Content-Type', 'application/json');
  
    const createdUser = await sequelize.models.User.findOne({
      where: { email: user.email },
    });
  
    expect(createdUser).toMatchObject(user);

  });


  it('da fehlt noch was passiert wenn Daten fehlen', async () => {


  });
  
});

//#endregion

//#region roles

describe('GET /roles', () => {
  it('should return a response with status 200', async () => {
    const response = await request(app).get(backend + 'roles');
    expect(response.status).toBe(200);
  });

  it('should return an array with data', async () => {
    const response = await request(app).get(backend + 'roles');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return an array with role objects', async () => {
    const response = await request(app).get(backend + 'roles');
    response.body.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
    });

  });

});
//#endregion

//#region categories
describe('GET /categories', () => {
  
  it('should return a response with status 200', async () => {
    const response = await request(app).get(backend + 'categories');
    expect(response.status).toBe(200);
  });

  it('should return array with data', async () => {
    await sequelize.models.Category.bulkCreate([
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test', description: 'test' },
    ]);
    const response = await request(app).get(backend + 'categories');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body.length).toBe(2);

  });

  it('should return array with category objects', async () => {
    await sequelize.models.Category.bulkCreate([
      { id: 1, name: 'test', description: 'test' },
      { id: 2, name: 'test', description: 'test' },
    ]);
    const response = await request(app).get(backend + 'categories');
    response.body.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('description');
    });

  });

  it('should return an empty array when there is no data', async () => {
    const response = await request(app).get(backend + 'categories');
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

    const response = await request(app).get(backend + 'categories/1');
    expect(response.status).toBe(200);
  });

  it('should return the right category object when the id is right ', async () => {
    let category = {
      id: 1,
      name: 'test',
      description: 'test',
    };
    await sequelize.models.Category.create(category);
    
    const response = await request(app).get(backend + 'categories/1');
    expect(response.body).toMatchObject(category);
  });

  it('should return a reponse with status 404 when there is no category with this id', async () => {

    const response = await request(app).get(backend + 'categories/1');
    expect(response.status).toBe(404);
  });

});

//#endregion