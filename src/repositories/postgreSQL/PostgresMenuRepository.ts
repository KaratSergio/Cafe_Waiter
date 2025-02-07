import { pool } from "../../db/postgreSQL";
import { MenuItem } from "../../models/MenuItem";
import { MenuRepository } from "../MenuRepository";
import { logger } from "../../utils/logger";

export class PostgresMenuRepository implements MenuRepository {
    async getAll(): Promise<MenuItem[]> { 
        const result = await pool.query('SELECT * FROM menu')
        return result.rows;
     }
    
    async getById(id: string): Promise<MenuItem | null> { 
        const result = await pool.query('SELECT * FROM menu WHERE id = $1', [id])
        return result.rows[0] || null;
    }
    
    async create(item: MenuItem): Promise<MenuItem> { 
        const result = await pool.query(
            'INSERT INTO menu (name, price) VALUES ($1, $2) RETURNING *',
            [item.name, item.price]
        )
        logger(`Added menu item: ${item.name}`);
        return result.rows[0];
     }
}