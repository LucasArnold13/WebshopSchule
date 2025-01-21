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

describe('GET /products', () => {
    it('should return a response with status 200', async () => {
      const response = await request(app).get(path + 'products');
      expect(response.status).toBe(200);
    });
  
    // it('should return an array with data', async () => {
    //   const response = await request(app).get(path + 'products');
  
    //   await sequelize.models.Category.bulkCreate([
    //     { id: 1, name: 'test', description: 'test' },
    //     { id: 2, name: 'test', description: 'test' },
    //   ]);
  
    //   await sequelize.models.Product.bulkCreate([
    //     { id: 1, name: 'Product 1', description: 'Description 1', quantity: 10, image_url: 'http://example.com/image1.jpg', category_id: 1, price: 100.00, sku: 'SKU1', is_active: true },
    //     { id: 2, name: 'Product 2', description: 'Description 2', quantity: 20, image_url: 'http://example.com/image2.jpg', category_id: 2, price: 200.00, sku: 'SKU2', is_active: true },
    //   ]);
  
    //   expect(Array.isArray(response.body)).toBe(true);
    //   expect(response.body.length).toBeGreaterThan(0);
    //   expect(response.body.length).toBe(2);
    // });
  
    // it('should return an array with product objects', async () => {
    //   await sequelize.models.Category.bulkCreate([
    //     { id: 1, name: 'test', description: 'test' },
    //     { id: 2, name: 'test', description: 'test' },
    //   ]);
  
    //   await sequelize.models.Product.bulkCreate([
    //     { id: 1, name: 'Product 1', description: 'Description 1', quantity: 10, image_url: 'http://example.com/image1.jpg', category_id: 1, price: 100.00, sku: 'SKU1', is_active: true },
    //     { id: 2, name: 'Product 2', description: 'Description 2', quantity: 20, image_url: 'http://example.com/image2.jpg', category_id: 2, price: 200.00, sku: 'SKU2', is_active: true },
    //   ]);
    //   const response = await request(app).get(path + 'products');
    //   response.body.forEach(item => {
    //     expect(item).toHaveProperty('id');
    //     expect(item).toHaveProperty('name');
    //     expect(item).toHaveProperty('description');
    //     expect(item).toHaveProperty('quantity');
    //     expect(item).toHaveProperty('image_url');
    //     expect(item).toHaveProperty('category_id');
    //     expect(item).toHaveProperty('price');
    //     expect(item).toHaveProperty('sku');
    //     expect(item).toHaveProperty('is_active');
    //   });
  
    // });
  
    // it('should return an empty array when there are no products', async () => {
    //   const response = await request(app).get(path + 'products');
  
    //   expect(Array.isArray(response.body)).toBe(true);
    //   expect(response.body.length).toBe(0);
    // });
  
  });