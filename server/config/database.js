import 'dotenv/config';
import { Pool } from 'pg';

const pool = new Pool({
    host: process.env.PGHOST,
    port: Number(process.envPGPORT),
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    max: 12,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
});

pool.on('error', (err) => {
    console.error('[pg] pool error: ', err);
    process.exit(1);
});

export default pool;