const { readData } = require("./readData");
const { transformData, getNumHostNames } = require("./transformData");
const { runQueries } = require("./runQueries");

const app = async (filePath, workers) => {
  let csvData = await readData(filePath);
  let queries = transformData(csvData);
  let numHostNames = getNumHostNames();

  let before = Date.now();
  let times = await runQueries(queries, workers);
  let after = Date.now();
  console.log("reaching end");

  times.sort((a, b) => (a - b));
  let half = Math.floor(times.length / 2);
  let median;

  if (times.length % 2) {
    median = times[half];
  } else {
    median = Math.round((times[half - 1] + times[half]) / 2.0);
  }

  let min = times[0];
  let max = times[times.length - 1];
  let sum = times.reduce((a, b) => a + b);
  let average = Math.round(sum / times.length);

  console.log(`Number of workers: ${workers}`);
  console.log(`Number of unique host names: ${numHostNames}`);
  console.log(`Queries Run: ${times.length}`);
  console.log(`Queries Sum Time: ${sum} ms`);
  console.log(`Total Runtime: ${after - before} ms`);
  console.log(`Minimum Query Time: ${min} ms`);
  console.log(`Maximum Query Time: ${max} ms`);
  console.log(`Median Query Time: ${median} ms`);
  console.log(`Average Query Time: ${average} ms`);
}

module.exports = { app };