import { MenuRepository } from '../repositories/interfaces/MenuRepository';
import { MenuItem } from '../models/MenuItem';
import { HttpError } from '../utils/httpError';
import { ALLOWED_CATEGORIES } from '../constants/menu';
import { isUniqueConstraintError } from '../utils/pgValidate';

export class MenuService {
  #menuRepo: MenuRepository;

  constructor(menuRepo: MenuRepository) {
    this.#menuRepo = menuRepo;
  }

  // VISITORS service
  async getMenu(): Promise<MenuItem[]> {
    return this.#menuRepo.getAll();
  }

  async getMenuItemById(id: number): Promise<MenuItem | null> {
    return this.#menuRepo.getById(id);
  }

  // ADMIN service
  async addMenuItem(item: MenuItem): Promise<MenuItem> {
    if (item.price < 0) {
      throw HttpError(400, 'Price cannot be negative');
    }

    if (!ALLOWED_CATEGORIES.includes(item.category)) {
      throw HttpError(400, 'Invalid category');
    }

    try {
      return await this.#menuRepo.create(item);
    } catch (error) {
      if (error instanceof Error && error.message === 'not unique name') {
        throw HttpError(409, 'Item with this name already exists');
      }
      throw HttpError(500, 'Internal Server Error');
    }
  }

  async updateMenuItem(id: number, updates: Partial<MenuItem>): Promise<MenuItem> {
    const existingItem = await this.#menuRepo.getById(id);
    if (!existingItem) {
      throw HttpError(404, 'Item not found');
    }

    try {
      return await this.#menuRepo.update({ ...existingItem, ...updates, id: existingItem.id });
    } catch (error) {
      if (error instanceof Error && error.message === 'not unique name') {
        throw HttpError(409, 'Item with this name already exists');
      }
      throw HttpError(500, 'Internal Server Error');
    }
  }

  async deleteMenuItem(id: number): Promise<void> {
    const existingItem = await this.#menuRepo.getById(id);
    if (!existingItem) {
      throw HttpError(404, 'Item not found');
    }

    return this.#menuRepo.delete(id);
  }
}
