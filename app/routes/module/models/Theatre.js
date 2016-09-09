'use strict';

var config = require('../../../config');

var Theatre = function ($resource) {
    var Theatre = $resource([config.app.service.url, 'user', 'login'].join('/') + config.wcmode, {}, {
		query: {
			method: 'POST'
		},

        map: {
            url: [config.app.service.url, 'theatre', 'map', 'cinema', ':theatre_id', ':cinema_id', ':date', ':fun'].join('/') + config.wcmode,
            method: 'GET'
        }
	});

	return Theatre;
};

Theatre.$inject = ['$resource'];
module.exports = Theatre;
