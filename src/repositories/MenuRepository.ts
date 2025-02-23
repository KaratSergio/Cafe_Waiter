import { MenuItem } from '../models/MenuItem';

export interface MenuRepository {
  getAll(): Promise<MenuItem[]>;
  getById(id: bigint): Promise<MenuItem | null>;
  getByName(name: string): Promise<MenuItem | null>;
  create(item: MenuItem): Promise<MenuItem>;
  update(item: Partial<MenuItem> & { id: bigint }): Promise<MenuItem>;
  delete(id: bigint): Promise<void>;
}
