import express from 'express';
import request from 'supertest';
import { OrderController } from '../../src/controllers/OrderController';

const app = express();
app.use(express.json());

app.get('/orders', OrderController.getAll);
app.post('/orders', OrderController.create);

describe('OrdersController', () => {
  it('should return an empty orders array', async () => {
    const response = await request(app).get('/orders');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('must create a new order', async () => {
    const newOrder = {
      items: [
        { id: '1', name: 'Makarones', price: 4 },
        { id: '2', name: 'Kotletas', price: 6 },
        { id: '3', name: 'Kompotes', price: 1 },
      ],
    };
    const response = await request(app).post('/orders').send(newOrder);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');

    expect(response.body.items).toEqual(
      newOrder.items.map((item) => ({
        menuItem: {
          id: item.id,
          name: item.name,
          price: item.price,
        },
        quantity: 1,
      })),
    );

    const expectedTotalPrice = newOrder.items.reduce((total, item) => total + item.price, 0);
    expect(response.body.totalPrice).toBe(expectedTotalPrice);
  });

  it('should return 400 for empty items array', async () => {
    const emptyOrder = { items: [] };
    const response = await request(app).post('/orders').send(emptyOrder);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Order must contain at least one item');
  });
});
