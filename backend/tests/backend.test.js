const request = require('supertest');
const app = require('../App');
const { User } = require('../models'); // Beispielmodell für Benutzer
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
  
  

describe('GET /users', () => {


    it('should response with status 200', async () => {
        
        const response = await request(app).get(backend + 'users');
        console.log(response.body);
        expect(response.status).toBe(200);
    });

    it('contains an Array with data', async () => {
        
        await sequelize.models.User.bulkCreate([
            { id: 1, name: 'John Doe', email: 'john@example.com', role_id: 1, is_active: true },
            { id: 2, name: 'Jane Doe', email: 'jane@example.com', role_id: 2, is_active: true },
          ]);

        const response = await request(app).get(backend + 'users');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
    });

    // it('array contains users', async () => {
    //     const response = await request(app).get(backend + 'users');
    //     response.body.forEach(item => {
    //         expect(item).toHaveProperty('id');
    //         expect(item).toHaveProperty('name');
    //         expect(item).toHaveProperty('email');
    //         expect(item).toHaveProperty('role_id');
    //         expect(item).toHaveProperty('is_active');
    //     });
   // });

});


// describe('GET /users/1', () => {
//     it('response status is 200', async () => {
//         const response = await request(app).get(backend + 'users');
//         expect(response.status).toBe(200);
//     });

    // it('response contains an array with data', async () => {
    //     const response = await request(app).get(backend + 'users');
    //     expect(Array.isArray(response.body)).toBe(true);
    //     expect(response.body.length).toBeGreaterThan(0);
    // });

    // it('array contains users', async () => {
    //     const response = await request(app).get(backend + 'users');
    //     response.body.forEach(item => {
    //         expect(item).toHaveProperty('id');
    //         expect(item).toHaveProperty('name');
    //         expect(item).toHaveProperty('email');
    //         expect(item).toHaveProperty('role_id');
    //         expect(item).toHaveProperty('is_active');
    //     });
    // });

//});
