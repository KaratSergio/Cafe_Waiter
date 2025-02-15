import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { validateData, orderSchema } from "../utils/validators";
import { asyncHandler } from "../utils/asyncHandler";

export const orderRoutes = Router();
orderRoutes.get('/', asyncHandler(OrderController.getAll))
orderRoutes.post('/', validateData(orderSchema), asyncHandler(OrderController.create))