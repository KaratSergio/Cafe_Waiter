import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { validateData, orderSchema } from '../utils/validators';
import { asyncHandler } from '../utils/asyncHandler';
import { isAdmin } from '../utils/adminMiddleware';

export const orderRoutes = Router();
orderRoutes.get('/', asyncHandler(OrderController.getAll));
orderRoutes.post('/', validateData(orderSchema), asyncHandler(OrderController.create));
orderRoutes.post('/:tableId/pay', asyncHandler(OrderController.payForTable));

// Admin routes
orderRoutes.post('/archive', isAdmin, asyncHandler(OrderController.archive));
