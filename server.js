'use strict';

console.log('Hello People');

//Making the Express server requirement work
const express = require('express');
const cors = require('cors');
// const axios = require('axios');
const app = express();
const weatherData = require('./data/weather.json');
app.use(cors());

//dotenv helps with accessing
require('dotenv').config();

const PORT = process.env.PORT;
//All things above are needed for express server!

class Forecast {
  constructor(description, date) {
    this.description = description;
    this.date = date;
  }
}
//How to hit weather route http://localhost:3001/weather?searchQuery=Seattle
app.get('/weather', (request, response) => {
  let searchCity = request.query.searchQuery;
  console.log('Search: ', searchCity);
  // let lat = parseInt(request.query.lat);
  // let lon = parseInt(request.query.lon);
  try {
    let cityFound = weatherData.find(city => city.city_name.toUpperCase() === searchCity.toUpperCase());
    console.log('city found: ', cityFound);
    let forecastArray = [];

    if (cityFound) {
      cityFound.data.forEach(cityParam => forecastArray.push(new Forecast(`The low of ${cityParam.low_temp}, the high of ${cityParam.high_temp} additionally ${cityParam.weather.description}`, cityParam.valid_date)));
      console.log(forecastArray);
      response.send(forecastArray);
    } else {
      response.status(500).send('Not getting through');
    }
  } catch (error) {
    response.status(500).send(error);
  }
});

app.get('/*', (request, response) => {
  response.status(404).send('Route does not exist!');
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
//   response.send('banana boys!');

// //Specifying the routes for server to listen for!
// app.get('/', (request, response) => {
//   response.send('hello, from the server!');
// });

// app.get('/banana', (request, response) => {
//   //when the trequest is recieved!
// });

// // Tell Server to listen for requests that are making
