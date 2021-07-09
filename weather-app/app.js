const dotenv = require('dotenv').config();
const request = require('request');
const yargs = require('yargs');
const chalk = require('chalk');

const accentMsg = chalk.yellow.bold;

const [query] = yargs.argv._;

const url = `http://api.weatherstack.com/current?access_key=${process.env.API_KEY}&query=${query}`;

request({ url, json: true }, (error, response, body) => {
  const { query } = body.request;
  const { temperature, feelslike } = body.current;
  console.log(accentMsg(query));
  console.log(
    `It is currently ${accentMsg(
      temperature
    )} degrees out. Feels like ${accentMsg(feelslike)} degrees tho.`
  );
});

