require('dotenv').config();
const yargs = require('yargs');
const chalk = require('chalk');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const [query] = yargs.argv._;
const errorMsg = chalk.red;

geocode(query, (error, data) => {
  if (error) {
    console.log(errorMsg(error));
  } else {
    console.log(data);
  }
});

forecast(-75.7088, 44.1545, (error, data) => {
  if (error) {
    console.log(errorMsg(error));
  } else {
    console.log(data);
  }
});
