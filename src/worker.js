require('dotenv').config();

const { Client } = require('pg');
const { parentPort, workerData, isMainThread } = require("worker_threads");

const connectionString = process.env.CONNECTION_STRING;
const client = new Client({
  connectionString,
});

if (!isMainThread) {
  (async () => {
    try {
      let before = Date.now();
      await client.connect();
      const res = await client.query(workerData.query, workerData.values);
      client.end();
      let after = Date.now();
      let time = after - before;
      parentPort.postMessage(time);
    } catch (err) {
      console.log(err.stack)
    }
  })().catch(err => console.log(err.stack))
}