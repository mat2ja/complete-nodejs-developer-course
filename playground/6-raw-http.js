require('dotenv').config();
// const http = require('http');
const https = require('https');

const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/zagreb.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`;

// const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=oslo&limit=1`;

const request = https.request(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data += chunk.toString();
  });

  response.on('end', () => {
    console.log(data);
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on('error', (error) => {
  console.log('An error occured =>', error);
});
request.end();
