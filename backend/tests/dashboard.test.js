const request = require('supertest');
const app = require('../App');
const { 
    Product
} = require('../models'); 
const { sequelize } = require('../models'); 
const db = require('../models'); 

// Pfad zur API
const path = '/api/'

afterAll(async () => {
  await sequelize.close();
});


describe('GET /orders', () => {

    it('should return a response with status 200', async () => {
      const response = await request(app).get(path + 'dashboard');
      expect(response.status).toBe(200);
    });

    // it('should contain an Array with data', async () => {

    //     await sequelize.models.User.bulkCreate([
    //       { name: 'John Doe', email: 'john@example.com', password: "test", role_id: 1, is_active: true },
    //       { name: 'Jane Doe', email: 'jane@example.com', password: "test", role_id: 2, is_active: true },
    //     ]);
    
    
    
    //     const response = await request(app).get(path + '/users');
    //     expect(Array.isArray(response.body)).toBe(true);
    //     expect(response.body.length).toBeGreaterThan(0);
    //   });

    
  
  });