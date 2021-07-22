const path = require('path');
const express = require('express');

const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

const app = express();

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath));

app.get('/', (req, res) => {
  res.render('index',{
    title: 'Weather App',
    name: 'Matijas Osrečkoch'
  })
})

app.get('/about', (req, res) => {
  res.render('about',{
    title: 'About',
    name: 'Matijaq Osrečque'
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    helpText: 'Ya need some help',
  })
})

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
  console.log(`🐕 Server is up on port ${port}`);
});
