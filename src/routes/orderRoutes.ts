import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';
import { validateData, orderSchema } from '../utils/validators';
import { asyncHandler } from '../utils/asyncHandler';
import { isAdmin } from '../utils/adminMiddleware';

export const orderRoutes = Router();
// VISITORS routes
orderRoutes.get('/:tableId/orders', asyncHandler(OrderController.getOrdersByTable));
orderRoutes.get('/:tableId/:orderId', asyncHandler(OrderController.getOrderByTableAndOrderId));
orderRoutes.post('/', validateData(orderSchema), asyncHandler(OrderController.create));
orderRoutes.post('/:tableId/pay', asyncHandler(OrderController.payForTable));

// ADMIN routes
orderRoutes.get('/', isAdmin, asyncHandler(OrderController.getAll));
orderRoutes.get('/:orderId', isAdmin, asyncHandler(OrderController.getById));
orderRoutes.post('/archive', isAdmin, asyncHandler(OrderController.archive));
