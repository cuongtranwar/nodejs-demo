const { Pool } = require('pg');

const pool = new Pool({
  user: 'library',
  host: 'localhost',
  database: 'library',
  password: '123456',
  port: 5432,
});

const query = async (text, params) => {
  const result = await pool.query(text, params);
  return result;
};
module.exports = {
  query
};
