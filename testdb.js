import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Connected Successfully!");
    console.log(res.rows);
  } catch (err) {
    console.error("Connection Failed:", err);
  }
};

testConnection();
