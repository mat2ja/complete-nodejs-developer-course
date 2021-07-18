const path = require('path');
const express = require('express');

const port = 3000;

const publicDirectoryPath = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicDirectoryPath));
//localhost:3000/indexxx.html

app.get('/', (req, res) => {
  res.send('<h1 style="font-family:sans-serif;">Hello Express 🌎</h1>');
});

app.get('/help', (req, res) => {
  res.send([
    {
      name: 'Matija',
      age: 21,
    },
    {
      name: 'Sara',
      age: 22,
    },
  ]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About</h1>');
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
  console.log(`🐕 Server is up on port ${port}`);
});
