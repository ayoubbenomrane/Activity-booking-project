import { Pool } from 'pg';
const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "experiences",
    password: "Ayoub2003",
    port: "5432"
});

export default pool;
