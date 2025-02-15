import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { validateData, orderSchema } from "../utils/validators";

export const orderRoutes = Router();
orderRoutes.get('/', OrderController.getAll)
orderRoutes.post('/', validateData(orderSchema), OrderController.create)