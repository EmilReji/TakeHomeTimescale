const parse = require('csv-parse');
const fs = require("fs");

async function readData(filePath) {
  const csvData = [];

  const stream = fs.createReadStream(filePath)
    .pipe(
      parse({
        delimiter: ","
      })
    );

  for await (const chunk of stream) {
    csvData.push(chunk);
  }

  return csvData;
}

module.exports = { readData };