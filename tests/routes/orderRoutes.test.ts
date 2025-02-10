import request from "supertest";
import express from "express";
import { orderRoutes } from "../../src/routes/orderRoutes";

const app = express();
app.use(express.json());
app.use('/orders', orderRoutes)

describe('Orders Routes', () => {
    it('GET /orders - should return all orders list', async () => {
        const response = await request(app).get('/orders');

        expect(response.status).toBe(200)
        expect(Array.isArray(response.body)).toBeTruthy();
    })
});