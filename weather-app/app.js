const dotenv = require('dotenv').config();
const request = require('request');
const yargs = require('yargs');
const chalk = require('chalk');

const accentMsg = chalk.yellow.bold;

const [query] = yargs.argv._;

const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${query}`;

request({ url, json: true }, (err, res, body) => {
  if ('success' in body && !body.success) {
    console.log(chalk.red(body.error.info));
  } else {
    const { query } = body.request;
    const {
      temperature,
      feelslike,
      weather_descriptions: [description],
    } = body.current;
    console.log(accentMsg(query));
    console.log(
      `${description}. It is currently ${accentMsg(
        temperature
      )} degrees out. Feels like ${accentMsg(feelslike)} degrees tho.`
    );
  }
});
