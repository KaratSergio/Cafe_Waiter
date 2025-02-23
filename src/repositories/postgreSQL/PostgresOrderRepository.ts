import { pool } from '../../db/postgreSQL';
import { Order } from '../../models/Orders';
import { OrderRepository } from '../OrderRepository';
import { logger } from '../../utils/logger';

export class PostgresOrderRepository implements OrderRepository {
  async getAll(): Promise<Order[]> {
    const ordersResult = await pool.query(`
        SELECT id, order_number AS "orderNumber", total_price AS "totalPrice", status
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

  async getById(id: bigint): Promise<Order | null> {
    const result = await pool.query('SELECT * FROM orders WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async create(order: Order): Promise<Order> {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');

    const countResult = await pool.query('SELECT COUNT(*) AS count FROM orders WHERE order_number LIKE $1', [`${dateStr}-%`]);
    const orderCount = parseInt(countResult.rows[0].count, 10) + 1;
    const orderNumber = `${dateStr}-${orderCount}`;

    const result = await pool.query('INSERT INTO orders (order_number, total_price, status) VALUES ($1, $2, $3) RETURNING *', [
      orderNumber,
      order.totalPrice,
      order.status,
    ]);

    const createdOrder = result.rows[0];

    for (const item of order.items) {
      await pool.query('INSERT INTO order_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)', [
        createdOrder.id,
        item.menuItem.id,
        item.quantity,
      ]);
    }

    logger(`Created order with ID: ${createdOrder.id}, Number: ${createdOrder.orderNumber}`);
    return createdOrder;
  }

  async archiveOrders(date: string): Promise<void> {
    const archivedDate = new Date();
    const dateStr = archivedDate.toISOString().split('T')[0];

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
      [archivedDate],
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

    await pool.query('DELETE FROM order_items WHERE order_id IN (SELECT id FROM orders WHERE created_at::DATE = $1)', [
      archivedDate,
    ]);
    await pool.query('DELETE from orders WHERE created_at::DATE = $1', [archivedDate]);

    logger(`All orders for ${dateStr} have been moved to archive`);
  }
}
