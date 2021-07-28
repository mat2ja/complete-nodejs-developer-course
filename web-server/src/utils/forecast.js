const request = require('request');

const forecast = (long, lat, callback) => {
	const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_API_KEY}&query=${lat},${long}&limit=1`;
	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service.');
		} else if (body.error) {
			callback('Unable to find location.');
		} else {
			const {
				temperature,
				feelslike,
				weather_descriptions: [description],
				wind_speed,
				is_day,
				humidity
			} = body.current;

			const forecastMsg =
				`${description}. ${is_day === 'no' ? 'Night' : 'Day'}.
				It is currently ${temperature} degrees out. Feels like ${feelslike} degrees tho.
				Wind speed be like ${wind_speed} km/h. Humidity? ${humidity}%.
			`;

			callback(null, forecastMsg);
		}
	});
};

module.exports = forecast;
