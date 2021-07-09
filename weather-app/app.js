const dotenv = require('dotenv').config();
const request = require('request');
const yargs = require('yargs');
const chalk = require('chalk');

const accentMsg = chalk.yellow.bold;

const [query] = yargs.argv._;

const weatherUrl = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${query}&limit=1`;

// request({ url: weatherUrl, json: true }, (error, response, body) => {
//   if ('success' in body && !body.success) {
//     console.log(chalk.red(body.error.info));
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

const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`;
request({ url: geocodeUrl, json: true }, (error, response, body) => {
  const [feature] = body.features;
  const [long, lat] = feature.center;
  console.log(lat, long);
});
