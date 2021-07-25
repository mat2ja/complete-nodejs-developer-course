const path = require('path');
const express = require('express');
const hbs = require('hbs');

const port = 3000;
const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
3;
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather',
		name: 'Matija Osrečki',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Matija Osrečki',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'Ya need some help',
		name: 'Matija Osrečki',
	});
});

app.get('/weather', (req, res) => {
	console.log(req.query);
	const { address } = req.query;

	if (!address) {
		return res.send({
			error: 'You must provide an address',
		});
	}
	res.send({
		address,
		location: address,
		forecast: 'pretty hot out here, 41 degrees',
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMsg: 'Help article not found',
		name: 'Matija Osrečki',
	});
});

app.get('*', (req, res) => {
	res.render('404', {
		title: '404',
		errorMsg: 'Page not found',
		name: 'Matija Osrečki',
	});
});

app.listen(port, () => {
	console.log(`🧰 Server is up on port ${port}`);
});
