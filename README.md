# Geobing

 Use Microsoft's geocoding and reverse geocoding services in your node projects.

## Installation

	$ npm install geobing

## Setup

 You can also set the API key by setting the BING_API_KEY environment variable to your key. Or you can use the setKey method.
```javascript
 geobing.setKey(YOUR_BING_API_KEY);
```

## Examples

```javascript

var geobing = require('geobing');

geobing.setKey(process.env.BING_API_KEY);

geobing.geocode('178 Laurel Brook Road, Middlefield, CT 06455', function (err, result) {
    console.log(result); // raw response from service
});

geobing.getCoordinates('178 Laurel Brook Road, Middlefield, CT 06455', function (err, coordinates) {
    console.log('lat: ', coordinates.lat, 'lng: ', coordinates.lng); // lat: 41.5091613 lng: -72.6943264
});

geobing.reverseGeocode(41.5091613, -72.6943264, function (err, result) {
    console.log(result); // raw response from service
});

geobing.getInfoFromCoordinates({ lat : 41.5091613, lng : -72.6943264 }, function (err, result) {
  console.log(result.name); // '178 Laurel Brook Rd, Middlefield, CT 06455'
});

```

## Test

	$ mocha test --key=[Your bing API key]