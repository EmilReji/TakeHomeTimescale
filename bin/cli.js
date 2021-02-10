#!/usr/bin/env node

const { app } = require("../src/app");
const { program } = require("commander");
const fs = require('fs');

const DEFAULT_FILE = "query_params.csv"
const DEFAULT_WORKERS = 1;

program
  .option('-f, --file <name>', 'please enter the csv file name to be used from within the /data folder', DEFAULT_FILE)
  .option('-w, --workers <number>', 'please enter the number of workers you want to use concurrently', DEFAULT_WORKERS)

program.parse(process.argv);

let { file, workers } = program.opts();

if (workers) {
  workers = Number(workers);
  if (isNaN(workers) || workers <= 0) {
    workers = DEFAULT_WORKERS;
  }

  if (workers > 20) {
    throw new Error(`${workers} is too many. Please enter a number between 1 and 20.`);
  }
}

let filePath = __dirname + "/../data/" + file;

if (!fs.existsSync(filePath)) {
  throw new Error(`The file ${file} does not exist at the path ${filePath}.`);
}

app(filePath, workers)