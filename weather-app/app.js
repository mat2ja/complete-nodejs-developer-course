require('dotenv').config();
const chalk = require('chalk');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const errorMsg = chalk.red;

const address = !!process.argv[2] ? process.argv[2].toString().trim() : null;

if (!address) {
  return console.log(errorMsg('No location provided.'));
}

geocode(address, (error, { lat, long, location } = {}) => {
  if (error) {
    return console.log(errorMsg(error));
  }

  forecast(lat, long, (error, forecastData) => {
    if (error) {
      return console.log(errorMsg(error));
    }
    console.log(chalk.yellow(location));
    console.log(chalk.italic(forecastData));
  });
});
