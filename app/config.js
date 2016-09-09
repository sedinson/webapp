/* global process */

'use strict';

var extend = require('extend'),
	md5 = require('md5');

/**
 * Production Environment
 */
var production = {
	mode: 'production',
	wcmode: ('?' + md5(location.protocol + location.hostname + location.port)).substr(0,7),
	app: {
		service: {
			url: 'https://royal-films.com/api/v1',
            actor_url: 'http://royal-films.com/actors/'
		}
	}
};

/**
 * Staging Environment
 */
var staging = {
	mode: 'staging',
	app: {
		service: {
			url: 'https://www.royal-films.com:3000'
		}
	}
};

/**
 * Development Environment
 */
var development = {
	mode: 'development',
	app: {
		service: {
			url: 'http://localhost:3000'
		}
	}
};

var mode = 'development';

switch (mode) {
	case 'production':
		module.exports = production;
		break;

	case 'staging':
		module.exports = extend(true, production, staging);
		break;

	case 'development':
		module.exports = extend(true, production, staging, development);
		break;
	default:
		console.error("Necesitas un environment valido");
		process.exit(1);
}

console.log("Environment %s", mode);
module.exports.mode = mode;
