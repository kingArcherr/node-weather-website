const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Lucas',
  });
  // res.send('hello');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Lucas',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    text: 'This is a test message',
    title: 'help',
    name: 'Lucas',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) return res.send({ error: 'Pls provide a location' });

  geoCode(req.query.address, (error, { lat, lng, location } = {}) => {
    if (error) return res.send({ error });

    forecast(lat, lng, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        location,
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
  // res.send({
  //   forecast: 'It is -8 degrees',
  //   location: 'Ontario, Canada',
  //   address: req.query.address,
  // });
});

// app.get('/products', (req, res) => {
//   if (!req.search) {
//     return res.send({ error: 'you must provide a location' });
//   }

//   console.log(req.query);
//   res.send({
//     products: [],
//   });
// });

app.get('/products', (req, res) => {
  if (!req.query.seach) {
    return res.send({ error: 'write search' });
  }

  res.send({ products: [] });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help Article Not Found',
    name: 'Lucas',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'page not found',
    name: 'Lucas',
  });
});

app.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
