'use strict';

var config = require('../../../config');

var General = function ($resource) {
    var General = $resource([config.app.service.url, 'general'].join('/') + config.wcmode, {}, {
		combos: {
            url: [config.app.service.url, 'general', 'combos', ':theatre_id'].join('/') + config.wcmode,
			method: 'GET'
		},
        prices: {
            url: [config.app.service.url, 'general', 'prices', ':theatre_id'].join('/') + config.wcmode,
            method: 'GET'
        },
        banners: {
            url: [config.app.service.url, 'general', 'banners', ':city_id'].join('/') + config.wcmode,
            method: 'GET'
        },
        theatre: {
            url: [config.app.service.url, 'general', 'theatre', ':theatre_id'].join('/') + config.wcmode,
            method: 'GET'
        },
        register: {
            url: [config.app.service.url, 'general', 'register'].join('/') + config.wcmode,
            method: 'GET'
        },
        schedule: {
            url: [config.app.service.url, 'general', 'schedule', ':schedule_id'].join('/') + config.wcmode,
            method: 'GET'
        }
	});

    return General;
};

General.$inject = ['$resource'];

module.exports = General;
