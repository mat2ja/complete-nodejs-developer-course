require('dotenv').config();
const request = require('request');
const yargs = require('yargs');
const chalk = require('chalk');

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

const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`;
request({ url: geocodeUrl, json: true }, (error, response, body) => {
  if (error) {
    console.error(errorMsg('Unable to connect to geocode service.'));
  } else if (!body.features.length) {
    console.error(errorMsg('Unable to find location. Try another search.'));
  } else {
    const [query] = body.query;
    const [feature] = body.features;
    const [long, lat] = feature.center;
    console.log(query, lat, long);
  }
});
