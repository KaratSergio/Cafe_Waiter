import { MenuRepository } from "../repositories/MenuRepository";
import { MenuItem } from "../models/MenuItem";
import { HttpError } from "../utils/httpError";

export class MenuService {
    #menuRepo: MenuRepository;

    constructor(menuRepo: MenuRepository) {
        this.#menuRepo = menuRepo;
    }

    async getMenu(): Promise<MenuItem[]> {
        return this.#menuRepo.getAll();
    }

    async addMenuItem(item: MenuItem): Promise<MenuItem> {
        if (item.price < 0) {
            throw HttpError(400, 'Price cannot be negative');
        }

        const existingItem = await this.#menuRepo.getByName(item.name);
        if (existingItem) {
            throw HttpError(409, 'Item with this name already exists');
        }
        
        return this.#menuRepo.create(item);
    }

    async updateMenuItem(id: string, updates: Partial<MenuItem>): Promise<MenuItem> {
    const existingItem = await this.#menuRepo.getById(id);
    if (!existingItem) {
        throw HttpError(404, 'Item not found');
    }

    if (updates.name) {
        const duplicate = await this.#menuRepo.getByName(updates.name);
        if (duplicate && duplicate.id !== id) {
            throw HttpError(409, 'Item with this name already exists');
        }
    }

    return this.#menuRepo.update({ ...existingItem, ...updates });
}

    async deleteMenuItem(id: string): Promise<void> {
        const existingItem = await this.#menuRepo.getById(id)
        if (!existingItem) {
            throw HttpError(404, 'Item not found');
        }

        return this.#menuRepo.delete(id);
    }
}