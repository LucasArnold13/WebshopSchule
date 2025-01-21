const request = require('supertest');
const app = require('../App');
const { 
    Role
} = require('../models'); 
const { sequelize } = require('../models'); 
const db = require('../models'); 

// Pfad zur API
const path = '/api/'

beforeEach(async () => {
  //Rollen erstellen
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

afterAll(async () => {
  await sequelize.close();
});

describe('GET /roles', () => {
    it('should return a response with status 200', async () => {
      const response = await request(app).get(path + 'roles');
      expect(response.status).toBe(200);
    });
  
    it('should return an array with data', async () => {
      const response = await request(app).get(path + 'roles');
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  
    it('should return an array with role objects', async () => {
      const response = await request(app).get(path + 'roles');
      response.body.forEach(item => {
        expect(item).toHaveProperty('id');
        expect(item).toHaveProperty('name');
      });
  
    });
  
  });