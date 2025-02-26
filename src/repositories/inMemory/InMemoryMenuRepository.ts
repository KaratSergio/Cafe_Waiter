// import { MenuItem } from '../../models/MenuItem';
// import { MenuRepository } from '../interfaces/MenuRepository';

// export class InMemoryMenuRepository implements MenuRepository {
//   #menu: MenuItem[] = [];

//   async getAll(): Promise<MenuItem[]> {
//     return this.#menu;
//   }

//   async getById(id: string): Promise<MenuItem | null> {
//     return this.#menu.find((item) => item.id === id) || null;
//   }

//   async getByName(name: string): Promise<MenuItem | null> {
//     return this.#menu.find((item) => item.name === name) || null;
//   }

//   async create(item: MenuItem): Promise<MenuItem> {
//     const existingItem = await this.getByName(item.name);

//     if (existingItem) {
//       throw new Error('An item with this name already exists');
//     }

//     this.#menu.push(item);
//     return item;
//   }

//   async update(item: MenuItem): Promise<MenuItem> {
//     const index = this.#menu.findIndex((i) => i.id === item.id);

//     if (index === -1) {
//       throw new Error('Menu item not found');
//     }

//     this.#menu[index] = item;
//     return item;
//   }

//   async delete(id: string): Promise<void> {
//     this.#menu = this.#menu.filter((item) => item.id !== id);
//   }
// }
