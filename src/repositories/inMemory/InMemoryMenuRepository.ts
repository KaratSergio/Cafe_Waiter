import { MenuItem } from "../../models/MenuItem";
import { MenuRepository } from "../MenuRepository";

export class InMemoryMenuRepository implements MenuRepository {
    #menu: MenuItem[] = [];

    async getAll(): Promise<MenuItem[]> {
        return this.#menu
    }

    async getById(id: string): Promise<MenuItem | null> {
        return this.#menu.find(item => item.id === id) || null;
    }

    async create(item: MenuItem): Promise<MenuItem> {
        this.#menu.push(item);
        return item
    }
}