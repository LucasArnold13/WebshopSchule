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


describe('GET /customers', () => {

    it('should return a response with status 200', async () => {
      const response = await request(app).get(path + 'customers');
      expect(response.status).toBe(200);
    });
  
  });