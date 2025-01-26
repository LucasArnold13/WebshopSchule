const request = require('supertest');
const app = require('../App');
const {
  User,
  Role
} = require('../models'); // Beispielmodell für Benutzer
const { sequelize } = require('../models'); // Importiere die sequelize-Instanz
const db = require('../models'); // Importiere das gesamte db-Objekt
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


describe('GET /users', () => {

  it('should response with status 200 when the user is logged in', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    const response = await agent.get(path + 'users');
    expect(response.status).toBe(200);
  });

  it('should response with status 401 when the user is not logged in', async () => {

    const response = await request(app).get(path + 'users');
    expect(response.status).toBe(401);
  });



  it('should contain an Array with data', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })
      .set('Content-Type', 'application/json')

    await User.create(
      { name: 'John Doe', email: 'john@gmail.com', password: "test", role_id: 1, is_active: true },
      { name: 'Jane Doe', email: 'jane@gmail.com', password: "test", role_id: 2, is_active: true },
    );



    const response = await agent.get(path + 'users');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should contain an array with user objects', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })

    await User.bulkCreate([
      { name: 'John Doe', email: 'john@gmail.com', password: "test", role_id: 1, is_active: true },
      { name: 'Jane Doe', email: 'jane@gmail.com', password: "test", role_id: 2, is_active: true },
    ]);

    const response = await agent.get(path + 'users');
    response.body.forEach(item => {
      expect(item).toHaveProperty('id');
      expect(item).toHaveProperty('name');
      expect(item).toHaveProperty('email');
      expect(item).toHaveProperty('role_id');
      expect(item).toHaveProperty('is_active');
    });


  });

});


describe('GET /users/:id', () => {

  it('should return a response with status 401 when there is an user with the right id and the user is not logged in', async () => {

    const user = await User.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await request(app).get(path + 'users/' + user.id);
    expect(response.status).toBe(401);
  });

  it('should return a response with status 200 when there is an user with the right id and the user is logged in', async () => {


    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })

    const user = await User.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await agent.get(path + 'users/' + user.id);
    expect(response.status).toBe(200);
  });


  it('should return a response with the correct user object when there is an user with the right id', async () => {

    const agent = request.agent(app);

    await agent
      .post(path + 'users/login')
      .send({ name: "test", password: "test" })

    const user = await User.create({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: "test",
      role_id: 1,
      is_active: true,
    });

    const response = await agent.get(path + 'users/' + user.id);
    expect(response.body).toMatchObject({
      name: user.name,
      email: user.email,
      role_id: user.role_id,  
      is_active: user.is_active,
    });
    expect(response.body).toHaveProperty('createdAt');
    expect(response.body).toHaveProperty('updatedAt');
  });


  //   it('should return a response with the correct user object that doesnt contain a password when there is an user with the right id', async () => {

  //     await sequelize.models.User.create({
  //       id: 1,
  //       name: 'John Doe',
  //       email: 'john@example.com',
  //       password: "test",
  //       role_id: 1,
  //       is_active: true,
  //     });

  //     const response = await request(app).get(path + '/users/1');

  //     expect(response.body).toMatchObject({
  //       id: 1,
  //       name: 'John Doe',
  //       email: 'john@example.com',
  //       role_id: 1,
  //       is_active: true,
  //     });
  //     expect(response.body).toHaveProperty('createdAt');
  //     expect(response.body).toHaveProperty('updatedAt');
  //     expect(response.body).not.toHaveProperty('password');
  //   });

  //   it('should return a response with status 404 when there is no user with this id', async () => {

  //     await sequelize.models.User.create({
  //       id: 1,
  //       name: 'John Doe',
  //       email: 'john@example.com',
  //       password: "test",
  //       role_id: 1,
  //       is_active: true,
  //     });

  //     const response = await request(app).get(path + '/users/100');

  //     expect(response.status).toBe(404);

  //   });

  //   it('should return a response with status 400 when the id is not a number', async () => {

  //     await sequelize.models.User.create({
  //       id: 1,
  //       name: 'John Doe',
  //       email: 'john@example.com',
  //       password: "test",
  //       role_id: 1,
  //       is_active: true,
  //     });

  //     const response = await request(app).get(path + '/users/asdsd');

  //     expect(response.status).toBe(400);

  //   });


});


// describe('PUT /users/:id', () => {

//   it('should return a response with status 200 when the user is updatet', async () => {

//     const user = await sequelize.models.User.create({
//       id: 1,
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: "test",
//       role_id: 1,
//       is_active: true,
//     });

//     user.name = "test";

//     const response = await request(app)
//       .put(path + '/users/' + user.id)
//       .send({
//         id: 1,
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: "test",
//         role_id: 1,
//         is_active: true,
//       })
//       .set('Content-Type', 'application/json');

//     expect(response.status).toBe(200);

//   });


//   it('should update the right user in the DB', async () => {


//     const user = {
//       id: 1,
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: "test",
//       role_id: 1,
//       is_active: true,
//     };
//     await sequelize.models.User.create(user);

//     user.name = "test";

//     const response = await request(app)
//       .put(path + '/users/' + user.id)
//       .send(user)
//       .set('Content-Type', 'application/json');

//     const dbUser = await User.findOne({
//       where: { id: user.id },
//       attributes: { exclude: ['password'] },
//     });
//     expect(dbUser.name).toBe(user.name);

//   });

//   it('should return a reponse with status 404 when there is no user with this ID', async () => {

//     let user = await sequelize.models.User.create({
//       id: 1,
//       name: 'John Doe',
//       email: 'john@example.com',
//       password: "test",
//       role_id: 1,
//       is_active: true,
//     });

//     const response = await request(app)
//       .put(path + '/users/' + 2)
//       .send({
//         id: 1,
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: "test",
//         role_id: 1,
//         is_active: true,
//       })
//       .set('Content-Type', 'application/json');

//     expect(response.status).toBe(404);

//   });

//   it('should return a response with status 400 when the id is not a number', async () => {

//     const response = await request(app)
//       .put(path + '/users/' + "ffsdsd")
//       .send({
//         id: 1,
//         name: 'John Doe',
//         email: 'john@example.com',
//         password: "test",
//         role_id: 1,
//         is_active: true,
//       })
//       .set('Content-Type', 'application/json');

//     expect(response.status).toBe(400);

//   });
// });


// describe('POST /users', () => {

//   it('should return a response with status 201 when the user was created successfully', async () => {

//     let user =
//     {
//       name: "test",
//       email: "test@gmail.com",
//       password: "test",
//       role_id: 1,
//       is_active: true
//     }

//     const response = await request(app)
//       .post(path + '/users')
//       .send(user)
//       .set('Content-Type', 'application/json');

//     expect(response.status).toBe(201);

//   });

//   it('should create a user in the DB based on the data', async () => {
//     const user = {
//       name: "test",
//       email: "test@example.com",
//       password: "test",
//       role_id: 1,
//       is_active: true,
//     };

//     const response = await request(app)
//       .post(path + '/users')
//       .send(user)
//       .set('Content-Type', 'application/json');

//     const createdUser = await sequelize.models.User.findOne({
//       where: { email: user.email },
//     });

//     expect(createdUser).toMatchObject({
//       name: user.name,
//       email: user.email,
//       role_id: user.role_id,
//       is_active: user.is_active,
//     });

//   });


//   it('da fehlt noch was passiert wenn Daten fehlen', async () => {


//   });

// });
