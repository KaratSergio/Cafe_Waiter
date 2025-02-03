import { MenuItem } from "../models/MenuItem";

export interface MenuRepository{
    getAll(): Promise<MenuItem[]>;
    getById(id: string): Promise<MenuItem | null>;
    create(item: MenuItem): Promise<MenuItem>;
}