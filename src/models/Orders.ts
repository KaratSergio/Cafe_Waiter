import { MenuItem } from "./MenuItem";

export interface Order {
    id: string;
    items: MenuItem[];
    totalPrice: number;
    status: 'pending' | 'preparing' | 'ready';
}