import { pool } from '../../db/postgreSQL';
import { TableRepository } from '../TableRepository';

export class PostgresTableRepository implements TableRepository {
  async updateTableStatus(tableId: number, totalPrice: number): Promise<void> {
    await pool.query('UPDATE tables SET status = $1, total_order_price = total_order_price + $2 WHERE id = $3', [
      'open',
      totalPrice,
      tableId,
    ]);
  }
}
