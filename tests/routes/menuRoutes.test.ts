import request from 'supertest';
import express from 'express';
import { menuRoutes } from '../../src/routes/menuRoutes';

const app = express();
app.use(express.json());
app.use('/menu', menuRoutes);

describe('Menu Routes', () => {
    it('GET /menu - should return all menu item list', async () => {
        const response = await request(app).get('/menu');

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
    });
});
