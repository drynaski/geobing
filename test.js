var assert = require('assert'),
	utils = require('./utils');

describe('geobing', function() {
	describe('#setKey()', function() {
		it('should set key property', function() {
			var geobing = require('./index.js');
			key = process.env.BING_API_KEY || 'key';

			geobing.setKey(key);
			if (geobing.key !== key) {
				throw new Error('key not set');
			}
		});
	});

	describe('#geocode', function () {
		it('should return geo coordinates of geocodable location', function (done) {
			var geobing = require('./index.js');
			geobing.setKey(process.env.BING_API_KEY || 'key');
			geobing.geocode('178 Laurel Brook Road, Middlefield, CT 06455', function (err, result) {
				var coordinates = utils.check(result, 'resourceSets.0.resources.0.point.coordinates');
				if(!coordinates || coordinates.length < 2) {
					throw new Error('coordinates not found');
				}
				done();
			});
		});
	});
});