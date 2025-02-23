const request = require('supertest');
const app = require('../App');
const { 
    Status
} = require('../models'); 
const db = require('../models');
const { sequelize } = require('../models'); 

// Pfad zur API
const path = '/api/'

afterAll(async () => {
  await sequelize.close();
});

afterEach(async () => {
  // Alle Tabellen leeren
  for (const model of Object.keys(db)) {
    if (db[model].destroy) {
      await db[model].destroy({ truncate: true, cascade: true });
    }
  }
});


describe('GET /status', () => {

    it('should return a response with status 200', async () => {
      const response = await request(app).get(path + 'status');
      expect(response.status).toBe(200);
    });

    it('should return array with data', async () => {

        await Status.bulkCreate([
          {  name: 'offen'},
          {  name: 'geschlossen'},
        ]);

  
        const response = await request(app).get(path + 'status');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body.length).toBe(2);
    
      });

      it('should return an empty array when there is no data', async () => {


  
        const response = await request(app).get(path + 'status');
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body.length).toBe(0);
    
      });


    
  
  });