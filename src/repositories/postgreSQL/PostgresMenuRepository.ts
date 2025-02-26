import { pool } from '../../db/postgreSQL';
import { MenuItem } from '../../models/MenuItem';
import { MenuRepository } from '../MenuRepository';
import { logger } from '../../utils/logger';

export class PostgresMenuRepository implements MenuRepository {
  // VISITORS pg query
  async getAll(category?: string): Promise<MenuItem[]> {
    const query = category ? 'SELECT * FROM menu WHERE category $1' : 'SELECT * FROM menu';
    const result = category ? await pool.query(query, [category]) : await pool.query(query);
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

  // ADMIN pg query
  async create(item: MenuItem): Promise<MenuItem> {
    const result = await pool.query('INSERT INTO menu (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *', [
      item.name,
      item.description,
      item.price,
      item.category,
    ]);
    logger(`Added menu item: ${item.name}`);
    return result.rows[0];
  }

  async update(item: Partial<MenuItem> & { id: bigint }): Promise<MenuItem> {
    const fields = Object.keys(item).filter((key) => key !== 'id');

    const query = `
    UPDATE menu 
    SET ${fields.map((key, index) => `${key} = $${index + 2}`).join(', ')}
    WHERE id = $1 
    RETURNING *;
    `;

    const values = [item.id, ...fields.map((key) => (item as any)[key])];
    const result = await pool.query(query, values);

    logger(`Updated menu item: ${item.name}`);
    return result.rows[0];
  }

  async delete(id: bigint): Promise<void> {
    await pool.query('DELETE FROM menu WHERE id = $1', [id]);
    logger(`Delete menu item with id: ${id}`);
  }
}
