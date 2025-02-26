import { MenuItem } from './MenuItem';

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  items: OrderItem[];
  tableId: number;
  totalPrice: number;
  status: 'pending' | 'preparing' | 'ready' | 'archived';
}

// export interface TestOrder extends Order {
//   isArchived: boolean;
//   createdAt: Date;
// }
