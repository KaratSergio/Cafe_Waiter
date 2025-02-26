// import { TestOrder } from '../../models/Orders';
// import { OrderRepository } from '../interfaces/OrderRepository';

// export class InMemoryOrderRepository implements OrderRepository {
//   #orders: TestOrder[] = [];

//   async getAll(): Promise<TestOrder[]> {
//     return this.#orders;
//   }

//   async getById(id: string): Promise<TestOrder | null> {
//     return this.#orders.find((order) => order.id === id) || null;
//   }

//   async create(order: TestOrder): Promise<TestOrder> {
//     const orderWithItems = {
//       ...order,
//       items: order.items.map((item) => ({
//         menuItem: {
//           id: item.menuItem.id,
//           name: item.menuItem.name,
//           price: item.menuItem.price,
//         },
//         quantity: item.quantity || 1,
//       })),
//     };
//     this.#orders.push(orderWithItems);
//     return orderWithItems;
//   }

//   async archiveOrders(orderCreatedDates: Record<string, Date>): Promise<void> {
//     const now = new Date();
//     const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
//     const startOfYesterday = new Date(startOfToday);
//     startOfYesterday.setDate(startOfToday.getDate() - 1);

//     this.#orders = this.#orders.map((order) => {
//       const createdAt = orderCreatedDates[order.id];
//       return createdAt && createdAt < startOfToday && createdAt >= startOfYesterday
//         ? { ...order, status: 'archived', isArchived: true }
//         : order;
//     });
//   }
// }
