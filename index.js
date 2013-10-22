/**
* Geobing
*/

var http = require( 'http' ),
  _ = require('underscore'),
  querystring = require( 'querystring' );

function Geobing () {
  this.key = null;
}

Geobing.prototype.setKey = function (key) {
  this.key = key;
};

Geobing.prototype.geocode = function (location, cbk) {
  if(this.key === null) {
    return cbk(new Error('Please use setKey and provide a key'));
  }

  if ( ! location ) {
      return cbk( new Error( "Geobing.geocode requires a location.") );
  }

  var options = _.extend({ q: location }, {
      key : this.key
  });

  var params = {
      host: 'dev.virtualearth.net',
      port: 80,
      path: '/REST/v1/Locations?' + querystring.stringify(options),
      headers: {}
  };

  return request( params, cbk );
};

Geobing.prototype.reverseGeocode = function ( lat, lng, cbk, opts ) {
  if ( !lat || !lng ) {
    return cbk( new Error( "Geobing.reverseGeocode requires a latitude and longitude." ) );
  }

  var options = _.extend({o: 'json', 'key' : this.key }, opts || {});

  var params = {
    host: 'dev.virtualearth.net',
    port: 80,
    path: '/REST/v1/Locations/' + lat + ',' + lng + '?' + querystring.stringify(options),
    headers: {}
  };

  return request( params, cbk );
};

function request ( options, cbk ) {
  http.get( options, function ( response ) {
    var data = "", result;

    response.on("error", function ( err ) {
      return cbk( err );
    });

    response.on("data", function ( chunk ) {
      data += chunk;
    });

    response.on("end", function ( argument ) {
      result = JSON.parse( data );
      return cbk( null, result );
    });

  }).on("error", function (err) {
    return cbk( err );
  });
}

module.exports = new Geobing();
