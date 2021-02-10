require('dotenv').config();
const { Pool } = require("pg");

async function runQueries(queries, workers) {
  const connectionString = process.env.CONNECTION_STRING;
  const pool = new Pool({
    connectionString,
  });
  let times = [];

  for await (const obj of queries) {
    let before = Date.now();
    const res = await pool.query(obj.query, obj.values);
    let after = Date.now();
    times.push(after - before);
  }

  pool.end();

  return times;
}
module.exports = { runQueries };