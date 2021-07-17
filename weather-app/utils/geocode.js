const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${process.env.GEOCODE_API_KEY}&limit=1`;
  request({ url, json: true }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to geocode service.');
    } else if (!body.features.length) {
      callback('Unable to find location. Try another search.');
    } else {
      const {
        place_name: location,
        center: [lat, long],
      } = body.features[0];
      callback(null, {
        lat,
        long,
        location,
      });
    }
  });
};

module.exports = geocode;
