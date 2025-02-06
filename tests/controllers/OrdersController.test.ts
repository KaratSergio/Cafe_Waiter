import express from 'express';
import request from 'supertest';
import { OrderController } from '../../src/controllers/OrderController';

const app = express();
app.use(express.json());

app.get('/orders', OrderController.getAll);
app.post('/orders', OrderController.create);

describe("OrdersController", () => {
    it('should return an empty orders array', async () => {
        const response = await request(app).get('/orders');
        expect(response.status).toBe(200);
        expect(response.body).toEqual([]);
    })

    it('must create a new order', async () => {
        const newOrder = { 
            items: [
                { id: '1', name: 'Makarones', price: 4 },
                { id: '2', name: 'Kotletas', price: 6 },
                { id: '3', name: 'Kompotes', price: 1 }
            ]
        }
        const response = await request(app).post('/orders').send(newOrder);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.items).toEqual(newOrder.items);
        expect(response.body.totalPrice).toBe(11);
    })
})