import { pool } from '../../db/postgreSQL';
import { TableRepository } from '../TableRepository';

export class PostgresTableRepository implements TableRepository {
  async updateTableStatus(tableId: number, totalPrice: number): Promise<void> {
    await pool.query('UPDATE tables SET status = $1, total_order_price = total_order_price + $2 WHERE id = $3', [
      'occupied',
      totalPrice,
      tableId,
    ]);
  }

  async archiveTableOrders(tableId: number): Promise<void> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await client.query('SELECT total_order_price FROM tables WHERE id = $1', [tableId]);
      const totalOrderPrice = result.rows[0].total_order_price || 0;
      if (totalOrderPrice > 0) {
        await client.query('INSERT INTO table_payments_archive (table_id, total_order_price) VALUES ($1, $2)', [
          tableId,
          totalOrderPrice,
        ]);
      }

      await client.query('UPDATE tables SET status = $1, total_order_price = 0 WHERE id = $2', ['free', tableId]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
