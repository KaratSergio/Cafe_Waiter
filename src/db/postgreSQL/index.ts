import { Pool } from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const pool = new Pool({
  user: process.env.PG_DB_USER,
  host: process.env.PG_DB_HOST,
  database: process.env.PG_DB_NAME,
  password: process.env.PG_DB_PASSWORD,
  port: Number(process.env.PG_DB_PORT) || 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

pool.on('connect', () => {
  console.log('🟢 Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('🔴 PostgreSQL connection error:', err);
});

export const initDB = async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'migrations', '26_02_25.sql')).toString();
    await pool.query(sql);
    console.log('✅ Database initialized');
  } catch (err) {
    console.error('❌ Error initializing database:', err);
  }
};
