import { MenuRepository } from "../repositories/MenuRepository";
import { MenuItem } from "../models/MenuItem";

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
            throw new Error('Price cannot be negative');
        }
        
        return this.#menuRepo.create(item);
    }
}