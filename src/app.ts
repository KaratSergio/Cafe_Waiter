import express from 'express';
import { orderRoutes } from './routes/orderRoutes'

export const app = express();
app.use(express.json());
app.use('/orders', orderRoutes)
