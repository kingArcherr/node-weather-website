const request = require('request');

const geoCode = (address, callback) => {
  const url =
    'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
    encodeURIComponent(address) +
    '.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiYXJjaGllLSIsImEiOiJja3hneDk5NGszdGNkMnBvNWszYWt2N3UyIn0.B96Yf4s0QP3fFk4JpW-CPQ&limit=1';

  request({ url, json: true }, (error, { body }) => {
    const { features = [] } = body;

    if (error) {
      callback('Unable to connect to location services', undefined);
    } else if (features.length === 0) {
      callback('Unable to find location. Try another search.', undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[0],
        lng: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
