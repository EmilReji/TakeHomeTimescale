const path = require("path");
const ThreadPool = require("./pool.js");
const workerScript = path.join(__dirname, "./worker.js");

async function runQuery(queryObj, threadPool) {
  return new Promise((resolve, reject) => {
    threadPool.acquire(workerScript, { workerData: queryObj }, (err, worker) => {
      if (err) {
        return reject(err);
      }
      let id = worker.threadId;
      console.log(`started worker ${id} (pool size: ${threadPool.size})`);
      worker.on('exit', function () {
        console.log(`worker ${id} exited (pool size: ${threadPool.size})`)
      })
      worker.once("message", resolve);
      worker.once("error", reject);
    });
  });
}

async function runQueries(queries, workers) {
  let times = [];
  const threadPool = new ThreadPool({ max: workers });

  for (const queryObj of queries) {
    // console.log(`Running query for: ${queryObj.values}`)
    let time = await runQuery(queryObj, threadPool);
    times.push(time);
  }

  return times;
}

module.exports = { runQueries };