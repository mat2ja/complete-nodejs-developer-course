require('dotenv').config();
const yargs = require('yargs');
const chalk = require('chalk');
const geocode = require('./utils/geocode');

const accentMsg = chalk.yellow.bold;

const [query] = yargs.argv._;
const errorMsg = chalk.red;

const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${query}&limit=1`;

// request({ url: weatherUrl, json: true }, (error, response, body) => {
//   console.log(body);
//   if (error) {
//     console.log(errorMsg('Unable to connect to weather service.'));
//   } else if (body.error) {
//     console.log(errorMsg('Unable to find location.'));
//   } else {
//     const { query } = body.request;
//     const {
//       temperature,
//       feelslike,
//       weather_descriptions: [description],
//     } = body.current;
//     console.log(accentMsg(query));
//     console.log(
//       `${description}. It is currently ${accentMsg(
//         temperature
//       )} degrees out. Feels like ${accentMsg(feelslike)} degrees tho.`
//     );
//   }
// });

geocode(query, (error, data) => {
  if (error) {
    console.log(errorMsg(error));
  } else {
    console.log(data);
  }
});
