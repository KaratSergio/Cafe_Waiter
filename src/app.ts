import express from 'express';
import { menuRoutes } from './routes/menuRoutes';
import { orderRoutes } from './routes/orderRoutes'

export const app = express();
app.use(express.json());
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
