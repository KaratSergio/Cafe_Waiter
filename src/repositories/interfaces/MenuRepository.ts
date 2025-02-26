import { MenuItem } from '../../models/MenuItem';

export interface MenuRepository {
  // VISITORS repo interface
  getAll(): Promise<MenuItem[]>;
  getById(id: number): Promise<MenuItem | null>;

  // ADMIN repo interface
  create(item: MenuItem): Promise<MenuItem>;
  update(item: Partial<MenuItem> & { id: number }): Promise<MenuItem>;
  delete(id: number): Promise<void>;
}
