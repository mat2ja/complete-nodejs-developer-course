import express from 'express';

const port = 3000;

const app = express();


// matijao.com
app.get('/', (req, res) => {
  res.send('Hello Express 🌎');
});

// matijao.com/help
app.get('/help', (req, res) => {
  res.send("Help me i'm stuck 🤗");
});

// matijao.com/about
app.get('/about', (req, res) => {
  res.send('about what ❓');
});

// matijao.com/weather
app.get('/weather', (req, res) => {
  res.send('weather getting wetter ☔');
});

// matijao.com/weather
app.get('/*', (req, res) => {
  res.send('❌❌❌❌❌❌❌');
});



app.listen(port, () => {
  console.log(`🐕 Server is up on port ${port}`);
});
