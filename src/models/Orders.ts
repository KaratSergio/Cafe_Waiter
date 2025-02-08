import { MenuItem } from "./MenuItem";

export interface OrderItem {
    menuItem: MenuItem;
    quantity: number;
}

export interface Order {
    id: string;
    orderNumber: string;
    items: OrderItem[];
    totalPrice: number;
    status: 'pending' | 'preparing' | 'ready';
}