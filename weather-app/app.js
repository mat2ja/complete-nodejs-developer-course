require('dotenv').config();
const yargs = require('yargs');
const chalk = require('chalk');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const errorMsg = chalk.red;
const [query] = yargs.argv._;

geocode(query, (error, geoData) => {
  if (error) {
    return console.log(errorMsg(error));
  }
  const { lat, long, location } = geoData;

  forecast(lat + 20000, long, (error, forecastData) => {
    if (error) {
      return console.log(errorMsg(error));
    }
    console.log(chalk.yellow(location));
    console.log(forecastData);
  });
});
