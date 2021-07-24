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
app.set('view engine', 'hbs');3
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Matija Osrečki'
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About',
		name: 'Matija Osrečki'
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		title: 'Help',
		helpText: 'Ya need some help',
		name: 'Matija Osrečki'
	});
});

app.get('/weather', (req, res) => {
	res.send({
		forecast: 'pretty hot out here, 41 degrees',
		location: 'donja prigornica',
	});
});

app.get('/*', (req, res) => {
	res.send('❌❌❌❌❌❌❌');
});

app.listen(port, () => {
	console.log(`🧰 Server is up on port ${port}`);
});
