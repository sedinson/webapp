'use strict';

var config = require('../../../config');

var City = function ($resource) {
    var City = $resource([config.app.service.url, 'cities'].join('/') + config.wcmode, {}, {
        all: {
            method: 'GET'
        },

        get: {
            url: [config.app.service.url, 'city', ':id'].join('/') + config.wcmode,
            method: 'GET'
        }
    });

    return City;
};

City.$inject = ['$resource'];

module.exports = City;
