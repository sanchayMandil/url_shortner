import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const check = async () => {
  try {
    console.log("Connected to:", process.env.DATABASE_URL);

    const tables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables
      WHERE table_schema = 'public'
    `);

    console.log("Tables in this database:");
    console.log(tables.rows);

  } catch (err) {
    console.error("ERROR:", err);
  }
};

check();
