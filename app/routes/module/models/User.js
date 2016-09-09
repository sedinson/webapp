'use strict';

var config = require('../../../config');

var User = function ($resource) {
    var User = $resource([config.app.service.url, 'user', 'login'].join('/') + config.wcmode, {}, {
		login: {
			method: 'POST'
		},

        me: {
            url: [config.app.service.url, 'user', 'me'].join('/') + config.wcmode,
            method: 'GET'
        },

        register: {
            url: [config.app.service.url, 'user', 'register'].join('/') + config.wcmode,
            method: 'POST'
        },

        update: {
            url: [config.app.service.url, 'user', 'update'].join('/') + config.wcmode,
            method: 'POST'
        },

        chgpwd: {
            url: [config.app.service.url, 'user', 'password', 'change'].join('/') + config.wcmode,
            method: 'POST'
        },

        contact: {
            url: [config.app.service.url, 'contactus'].join('/') + config.wcmode,
            method: 'POST'
        }
	});

	return User;
};

User.$inject = ['$resource'];
module.exports = User;
