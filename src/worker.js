const { parentPort, workerData, isMainThread } = require("worker_threads");

// if (!isMainThread) {
//   let before = Date.now();
//   const res = await DBPool.query(workerData.queryObj.query, workerData.queryObj.values);
//   let after = Date.now();
//   workerData.times.push(after - before);
//   // we post a message through the parent port, to emit the "message" event
//   parentPort.postMessage(workerData); // returns same array passed in
// }


/*
Creates 10 workers in pool first
Takes far less time for queries (6 sec for 200) but a lot more time in between (200 for 200)
*/
// require('dotenv').config();
// const { Pool } = require("pg");
// const connectionString = process.env.CONNECTION_STRING;
// const DBPool = new Pool({
//   connectionString,
// });
// if (!isMainThread) {
//   ; (async () => {
//     const client = await DBPool.connect()
//     try {
//       let before = Date.now();
//       const res = await client.query(workerData.query, workerData.values);
//       let after = Date.now();
//       let time = after - before;
//       // we post a message through the parent port, to emit the "message" event
//       parentPort.postMessage(time);
//     } finally {
//       // Make sure to release the client before any error handling,
//       // just in case the error handling itself throws an error.
//       client.release()
//     }
//   })().catch(err => console.log(err.stack))
// }


/* 
Creates 1 to 2 workers in pool first, then runs and exits and adds another
Takes far less more time for queries (44 sec for 200) but a lot less time in between (55 sec for 200)
*/
require('dotenv').config();
const { Client } = require('pg');
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
      // we post a message through the parent port, to emit the "message" event
      parentPort.postMessage(time);
    } catch (err) {
      console.log(err.stack)
    }
  })().catch(err => console.log(err.stack))
}