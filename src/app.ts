import express from 'express';
import { menuRoutes } from './routes/menuRoutes';
import { orderRoutes } from './routes/orderRoutes';
import { errorHandler } from './utils/errorHandler';

export const app = express();
app.use(express.json());
app.use('/menu', menuRoutes);
app.use('/orders', orderRoutes);
app.use(errorHandler);