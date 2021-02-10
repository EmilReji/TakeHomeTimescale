let hostNames = {};
let numHostNames = 0;

function transformData(csvData) {
  let headers = csvData.shift();

  let queries = csvData.map((data) => {
    hostNames[data[0]] = true;

    return {
      values: data,
      query: "SELECT to_timestamp(floor(extract('epoch' FROM ts)/60) * 60) AT TIME ZONE 'UTC' AS minute, count(*), min(usage), max(usage) FROM cpu_usage WHERE host = $1 AND ts BETWEEN $2 AND $3 GROUP BY minute ORDER BY minute DESC"
    }
  });

  numHostNames = Object.keys(hostNames).length;

  return queries;
}

function getNumHostNames() {
  return numHostNames;
}

module.exports = { transformData, getNumHostNames };