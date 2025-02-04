import { Router } from "express";
import { OrderController } from "../controllers/OrderController";

export const orderRoutes = Router();
orderRoutes.get('/', OrderController.getAll)
orderRoutes.post('/', OrderController.create)