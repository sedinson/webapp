'use strict';

var config = require('../../../config');

var Movie = function ($resource) {
	var Movie = $resource([config.app.service.url, 'user', 'login'].join('/') + config.wcmode, {}, {
		query: {
			method: 'POST'
		},
		premiere: {
			url: [config.app.service.url, 'movies', 'premiere'].join('/') + config.wcmode,
			method: 'GET'
		},
		billboard: {
			url: [config.app.service.url, 'movies', 'city', ':city_id', 'billboard'].join('/') + config.wcmode,
			method: 'GET'
		},
		theatre: {
			url: [config.app.service.url, 'movies', 'theatre', ':theatre_id', 'billboard'].join('/') + config.wcmode,
			method: 'GET'
		},
		get: {
			url: [config.app.service.url, 'movie', ':id', ':city_id'].join('/') + config.wcmode,
			method: 'GET'
		},
		schedules: {
			url: [config.app.service.url, 'movie', ':movie_id', 'city', ':city_id', 'schedules', ':date'].join('/') + config.wcmode,
			method: 'GET'
		},
		rank: {
			url: [config.app.service.url, 'rank', ':movie_id'].join('/') + config.wcmode,
			method: 'POST',
			params: {
				movie_id: '@movie_id'
			}
		},
		reserve: {
			url: [config.app.service.url, 'user', 'movie', 'reserve'].join('/') + config.wcmode,
			method: 'POST'
		}
	});

	return Movie;
};

Movie.$inject = ['$resource'];

module.exports = Movie;
