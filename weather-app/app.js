require('dotenv').config();
const chalk = require('chalk');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const errorMsg = chalk.red;

const query = !!process.argv[2] ? process.argv[2].toString().trim() : null;

if (!query) {
  return console.log(errorMsg('No location provided.'));
}

geocode(query, (error, geoData) => {
  if (error) {
    return console.log(errorMsg(error));
  }
  const { lat, long, location } = geoData;
  console.log(geoData);

  forecast(lat, long, (error, forecastData) => {
    if (error) {
      return console.log(errorMsg(error));
    }
    console.log(chalk.yellow(location));
    console.log(forecastData);
  });
});
