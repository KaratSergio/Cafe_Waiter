import { pool } from '../../db/postgreSQL';
import { MenuItem } from '../../models/MenuItem';
import { MenuRepository } from '../MenuRepository';
import { logger } from '../../utils/logger';

export class PostgresMenuRepository implements MenuRepository {
  async getAll(): Promise<MenuItem[]> {
    const result = await pool.query('SELECT * FROM menu');
    return result.rows;
  }

  async getById(id: bigint): Promise<MenuItem | null> {
    const result = await pool.query('SELECT * FROM menu WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  async getByName(name: string): Promise<MenuItem | null> {
    const result = await pool.query('SELECT * FROM menu WHERE name = $1', [name]);
    return result.rows[0] || null;
  }

  async create(item: MenuItem): Promise<MenuItem> {
    const result = await pool.query('INSERT INTO menu (name, description, price) VALUES ($1, $2, $3) RETURNING *', [
      item.name,
      item.description,
      item.price,
    ]);
    logger(`Added menu item: ${item.name}`);
    return result.rows[0];
  }

  async update(item: MenuItem): Promise<MenuItem> {
    const result = await pool.query('UPDATE menu SET name = $1, description = $2, price = $3 WHERE id = $4 RETURNING *', [
      item.name,
      item.description,
      item.price,
      item.id,
    ]);

    if (result.rowCount === 0) {
      throw new Error('Update field, item not found');
    }

    logger(`Updated menu item: ${item.name}`);
    return result.rows[0];
  }

  async delete(id: bigint): Promise<void> {
    const result = await pool.query('DELETE FROM menu WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      throw new Error('Delete failed, item not found');
    }

    logger(`Delete menu item with id: ${id}`);
  }
}
