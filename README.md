# Timescale Take Home Assignment

## Setup

Once this repository has been cloned, run `npm i` in the local repo to download any dependencies.

Then create a `.env` folder. In it, make sure to setup a `CONNECTION_STRING` environment variable with the connection string to the Timescale database being used.

## Running The App

To run the app with default parameters, use `node bin/cli.js`. Note that there will likely be a delay (up to 2 minutes) due to the overhead of running queries and creating worker threads. 

The two arguments you can use are `-f <file name with data>` and `-w <number of worker threads>`.

Ex. `node bin/cli.js -f data.csv -w 10`

This will use the data.csv file (instead of the default query_params.csv file) and 10 worker threads (instead of the default 1 worker thread).