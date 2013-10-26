var assert = require('assert'),
	argv = require('optimist').argv,
	utils = require('./utils');

describe('geobing', function() {
	describe('#setKey()', function() {
		it('should set key property', function() {
			var geobing = require('./index.js');
			key = process.env.BING_API_KEY || argv.key;
			geobing.setKey(key);
			if (geobing.key !== key) {
				throw new Error('key not set');
			}
		});
	});

	describe('#geocode', function () {
		it('should return geo coordinates of geocodable location', function (done) {
			var geobing = require('./index.js');
			geobing.setKey(process.env.BING_API_KEY || argv.key);
			geobing.geocode('178 Laurel Brook Road, Middlefield, CT 06455', function (err, result) {
				var coordinates = utils.check(result, 'resourceSets.0.resources.0.point.coordinates');
				if(!coordinates || coordinates.length < 2) {
					throw new Error('coordinates not found');
				}
				done();
			});
		});
	});

	describe('#getCoordinates', function () {
		it('should return geo coordinates of geocodable location', function (done) {
			var geobing = require('./index.js');
			geobing.setKey(process.env.BING_API_KEY || argv.key);
			geobing.getCoordinates('178 Laurel Brook Road, Middlefield, CT 06455', function (err, result) {
				if(err) {
					throw err;
				}
				if(!(typeof result.lng === 'number' && typeof result.lat === 'number')) {
					throw new Error('coordinates not two floats');
				}
				done();
			});
		});
	});

	describe('#reverseGeocode', function () {
		it('should return location information from coodinates', function (done) {
			var geobing = require('./index.js');
			geobing.setKey(process.env.BING_API_KEY || argv.key);
			geobing.getCoordinates('178 Laurel Brook Road, Middlefield, CT 06455', function (err, result) {
				geobing.reverseGeocode(result.lat, result.lng, function (err, result) {
					if(err) {
						throw err;
					}
					var info = utils.check(result, 'resourceSets.0.resources.0');
					if(!info || info === null) {
						throw new Error('Invalid results');
					}
					done();
				});
			});
		});
	});

	describe('#getInfoFromCoordinates', function () {
		it('should return location information from coodinates', function (done) {
			var geobing = require('./index.js');
			geobing.getCoordinates('178 Laurel Brook Road, Middlefield, CT 06455', function (err, result) {
				geobing.getInfoFromCoordinates(result, function (err, result) {
					if(err) {
						throw err;
					}
					if(!('name' in result)) {
						throw new Error('No properties in result');
					}
					done();
				});
			});
		});
	});
});