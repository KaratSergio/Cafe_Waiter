import { pool } from "../../db/postgreSQL";
import { Order } from "../../models/Orders";
import { OrderRepository } from "../OrderRepository";
import { logger } from "../../utils/logger";

export class PostgresOrderRepository implements OrderRepository {
    async getAll(): Promise<Order[]> { 
        const result = await pool.query('SELECT * FROM "order"')
        return result.rows
    }
    
    async getById(id: string): Promise<Order | null> {
        const result = await pool.query('SELECT * FROM "order" WHERE id $1', [id])
        return result.rows[0] || null;
    }

    async create(order: Order): Promise<Order> {
        const result = await pool.query(
            'INSERT INTO orders (id, totalPrice, status) VALUES ($1, $2, $3) RETURNING *',
            [order.id, order.totalPrice, order.status]
        )
        logger(`Created order with ID: ${order.id}`);
        return result.rows[0];
    }
}