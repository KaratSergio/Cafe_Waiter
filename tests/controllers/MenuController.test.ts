import express from 'express';
import request from 'supertest';
import { MenuController } from '../../src/controllers/MenuController';

const app = express();
app.use(express.json())

app.get('/menu', MenuController.getAll);
app.post('/menu', MenuController.addItem);

describe("MenuController", () => {
    it('should return an empty menu array', async () => {
        const response = await request(app).get('/menu');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    })

    it('should add a new item to the menu', async () => {
        const newItem = { id: '1', name: "Borsch", price: 21 }
        const response = await request(app).post('/menu').send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newItem);
    })

    it('should return 400 for negative price', async () => {
        const invalidMenuItem = { id: '1', name: 'Pasta', price: -10 }
        const response = await request(app).post("/menu").send(invalidMenuItem)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error', 'Price cannot be negative')
    })
})