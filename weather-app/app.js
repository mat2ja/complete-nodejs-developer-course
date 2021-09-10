import dotenv from 'dotenv';
import chalk from 'chalk';
import geocode from './utils/geocode.js';
import forecast from './utils/forecast.js';

dotenv.config();

const errorMsg = chalk.red;

const address = !!process.argv[2] ? process.argv[2].toString().trim() : null;

if (!address) {
  console.log(errorMsg('No location provided.'));
} else {
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
}

process.env.