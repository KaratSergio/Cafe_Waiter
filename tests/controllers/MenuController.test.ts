import express from 'express';
import request from 'supertest';
import { MenuController } from '../../src/controllers/MenuController';

const app = express();
app.use(express.json());

app.get('/menu', MenuController.getAll);
app.post('/menu', MenuController.addItem);
app.patch('/menu/:id', MenuController.updateItem);
app.delete('/menu/:id', MenuController.deleteItem);

describe('MenuController', () => {
  it('should return an empty menu array', async () => {
    const response = await request(app).get('/menu');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should add a new item to the menu', async () => {
    const newItem = { id: '1', name: 'Borsch', price: 21 };
    const response = await request(app).post('/menu').send(newItem);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(newItem);
  });

  it('should return 400 for negative price', async () => {
    const invalidMenuItem = { id: '2', name: 'Pasta', price: -10 };
    const response = await request(app).post('/menu').send(invalidMenuItem);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should update a menu item', async () => {
    const newItem = { id: '3', name: 'Borsch Classic', price: 21 };
    const createResponse = await request(app).post('/menu').send(newItem);

    expect(createResponse.status).toBe(201);

    const updatedItem = { id: '3', name: 'Updated Borsch Classic', price: 25 };
    const updateResponse = await request(app).patch('/menu/3').send(updatedItem);

    expect(updateResponse.status).toBe(200);
    expect(updateResponse.body).toMatchObject(updatedItem);
  });

  it('should delete a menu item', async () => {
    const newItem = { id: '1', name: 'Chicken Kiev', price: 21 };
    const createResponse = await request(app).post('/menu').send(newItem);

    expect(createResponse.status).toBe(201);

    const deleteResponse = await request(app).delete('/menu/1');
    expect(deleteResponse.status).toBe(204);

    const getResponse = await request(app).get('/menu');
    expect(getResponse.body.find((item: any) => item.id === '1')).toBeUndefined();
  });

  it('should handle error when adding an item with an existing name', async () => {
    const newItem = { id: '2', name: 'Vegetarian Borscht', price: 21 };
    const createResponse = await request(app).post('/menu').send(newItem);

    expect(createResponse.status).toBe(201);

    const duplicateItem = { id: '3', name: 'Vegetarian Borscht', price: 22 };
    const duplicateResponse = await request(app).post('/menu').send(duplicateItem);

    expect(duplicateResponse.status).toBe(400);
    expect(duplicateResponse.body.error).toBe('Item with this name already exists');
  });
});
