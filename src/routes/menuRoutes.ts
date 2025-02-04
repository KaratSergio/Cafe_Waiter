import { Router } from "express";
import { MenuController } from "../controllers/MenuController";

export const menuRoutes = Router();
menuRoutes.get('/', MenuController.getAll)
menuRoutes.post('/', MenuController.addItem)