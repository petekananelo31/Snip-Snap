const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

async function create(code, url) {
  const result = await pool.query(
    `INSERT INTO links (short_code, original_url, clicks, created_at)
     VALUES ($1, $2, 0, NOW()) RETURNING *`,
    [code, url]
  );
  return result.rows[0];
}

async function get(code) {
  const result = await pool.query(
    `SELECT * FROM links WHERE short_code = $1`, [code]
  );
  return result.rows[0] || null;
}

async function has(code) {
  const result = await pool.query(
    `SELECT 1 FROM links WHERE short_code = $1`, [code]
  );
  return result.rowCount > 0;
}

async function recordClick(code) {
  const result = await pool.query(
    `UPDATE links SET clicks = clicks + 1 
     WHERE short_code = $1 RETURNING *`, [code]
  );
  return result.rows[0] || null;
}

module.exports = { create, get, has, recordClick };
