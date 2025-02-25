import { Router } from 'express';
import { MenuController } from '../controllers/MenuController';
import { validateData, menuItemSchema, updateMenuItemSchema } from '../utils/validators';
import { asyncHandler } from '../utils/asyncHandler';
import { isAdmin } from '../utils/adminMiddleware';

export const menuRoutes = Router();
// VISITORS routes
menuRoutes.get('/', asyncHandler(MenuController.getAll));

// ADMIN routes (add, change, delete)
menuRoutes.post('/', isAdmin, validateData(menuItemSchema), asyncHandler(MenuController.addItem));
menuRoutes.patch('/:id', isAdmin, validateData(updateMenuItemSchema), asyncHandler(MenuController.updateItem));
menuRoutes.delete('/:id', isAdmin, asyncHandler(MenuController.deleteItem));
