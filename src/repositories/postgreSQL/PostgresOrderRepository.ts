import { pool } from '../../db/postgreSQL';
import { Order } from '../../models/Orders';
import { OrderRepository } from '../interfaces/OrderRepository';
import { logger } from '../../utils/logger';

export class PostgresOrderRepository implements OrderRepository {
  // VISITORS pg query
  async create(order: Order): Promise<Order> {
    const result = await pool.query(
      'INSERT INTO orders (order_number, total_price, status, table_id) VALUES (generate_order_number(), $1, $2, $3) RETURNING *',
      [order.totalPrice, order.status, order.tableId],
    );

    const createdOrder = result.rows[0];

    for (const item of order.items) {
      await pool.query('INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)', [
        createdOrder.id,
        item.menuItem.id,
        item.quantity,
      ]);
    }

    logger(`Created order with ID: ${createdOrder.id}, Number: ${createdOrder.order_number}`);
    return createdOrder;
  }

  async getOrdersByTableId(tableId: number): Promise<Order[]> {
    const result = await pool.query(
      `  
      SELECT id, order_number AS "orderNumber", total_price AS "totalPrice", status FROM orders WHERE table_id = $1
      `,
      [tableId],
    );
    return result.rows;
  }

  async getOrderByTableId(tableId: number, orderId: number): Promise<Order | null> {
    const result = await pool.query(
      `
      SELECT id, order_number AS "orderNumber", total_price AS "totalPrice", status FROM orders WHERE table_id = $1 and id = $2
      `,
      [tableId, orderId],
    );
    return result.rows[0] || null;
  }

  // ADMIN pg query
  async getAll(): Promise<Order[]> {
    const ordersResult = await pool.query(`
        SELECT id, order_number AS "orderNumber", total_price AS "totalPrice", status, table_id AS "tableId"
        FROM orders
    `);

    const orders = ordersResult.rows;

    for (const order of orders) {
      const itemsResult = await pool.query(
        `
            SELECT 
                m.id AS "id",
                m.name AS "name",
                m.price AS "price",
                oi.quantity AS "quantity"
            FROM order_items oi
            JOIN menu m ON oi.menu_item_id = m.id
            WHERE oi.order_id = $1
        `,
        [order.id],
      );

      order.items = itemsResult.rows.map((row) => ({
        menuItem: {
          id: row.id.toString(),
          name: row.name,
          price: parseFloat(row.price),
        },
        quantity: row.quantity,
      }));
    }

    return orders;
  }

  async getById(id: number): Promise<Order | null> {
    const result = await pool.query(
      `SELECT id, order_number AS "orderNumber", total_price AS "totalPrice", status, table_id AS "tableId" FROM orders WHERE id = $1`,
      [id],
    );
    return result.rows[0] || null;
  }

  async archiveOrders(date: string): Promise<void> {
    const archivedDate = new Date().toISOString().split('T')[0];
    const dateStr = new Date(date).toISOString().split('T')[0];

    const archivedOrders = await pool.query(
      `
            INSERT INTO orders_archive (archived_date, order_number, total_price, status)
            SELECT $1, order_number, total_price, status FROM orders
            WHERE CAST(created_at AS DATE) = $2
            RETURNING id, order_number;
        `,
      [dateStr, archivedDate],
    );

    const orderMap = new Map(archivedOrders.rows.map((order) => [order.order_number, order.id]));

    const orderItems = await pool.query(
      `
        SELECT oi.*, o.order_number FROM order_items oi
        JOIN orders o ON oi.order_id = o.id
        WHERE CAST(o.created_at AS DATE) = $1
    `,
      [dateStr],
    );

    for (const item of orderItems.rows) {
      const archivedOrderId = orderMap.get(item.order_number);
      if (archivedOrderId) {
        await pool.query(
          `
                INSERT INTO order_items_archive (order_id, menu_item_id, quantity)
                VALUES ($1, $2, $3)
            `,
          [archivedOrderId, item.menu_item_id, item.quantity],
        );
      }
    }

    await pool.query('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE created_at::DATE = $1)', [dateStr]);
    await pool.query('DELETE from orders WHERE created_at::DATE = $1', [dateStr]);

    logger(`All orders for ${dateStr} have been moved to archive`);
  }
}
