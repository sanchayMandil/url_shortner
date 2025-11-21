import { pool } from "../config/db.js";

export const LinkModel = {
  async create(code, url) {
    const result = await pool.query(
      `INSERT INTO links (code, url) VALUES ($1, $2) RETURNING *`,
      [code, url]
    );
    return result.rows[0];
  },

  async findByCode(code) {
    const result = await pool.query(
      `SELECT * FROM links WHERE code = $1`,
      [code]
    );
    return result.rows[0];
  },

  async getAll() {
    const result = await pool.query(
      `SELECT * FROM links ORDER BY created_at DESC`
    );
    return result.rows;
  },

  async delete(code) {
    await pool.query(`DELETE FROM links WHERE code = $1`, [code]);
  },

  async incrementClicks(code) {
  await pool.query(
    `UPDATE links SET clicks = clicks + 1, last_clicked = NOW() WHERE code = $1`,
    [code]
  );
}
};
