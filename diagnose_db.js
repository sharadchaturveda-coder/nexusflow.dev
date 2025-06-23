// diagnose_db.js
require('dotenv').config({ path: './.env.local' });
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function checkColumns() {
  console.log('Connecting to the database to check "usage_logs" columns...');
  const client = await pool.connect();
  try {
    const result = await client.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = 'usage_logs'"
    );
    console.log('SUCCESS: Found the following columns:');
    result.rows.forEach(row => console.log(`- ${row.column_name}`));
  } catch (err) {
    console.error('ERROR: Failed to query database.', err);
  } finally {
    await client.release();
    await pool.end();
  }
}

checkColumns();