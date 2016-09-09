/* global angular */
'use strict';

require('angular');
require('angular-ui-router');
require('angular-resource');
require('angular-loading-bar');

var moment = require('moment'),
    config = require('./config'),
    common = require('./libs/common'),
    _module = require('./routes/module');

/**
    cookieStorage
*/
if (!window.cookieStorage) {
    window.cookieStorage = {
        getItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) { return null; }
            return unescape(document.cookie.replace(new RegExp("(?:^|.*;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*"), "$1"));
        },
        key: function (nKeyId) {
            return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, "").split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function (sKey, sValue) {
            if (!sKey) { return; }
            document.cookie = escape(sKey) + "=" + escape(sValue) + "; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/";
            this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) { return; }
            document.cookie = escape(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
            this.length--;
        },
        hasOwnProperty: function (sKey) {
            return (new RegExp("(?:^|;\\s*)" + escape(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
        }
    };

    window.cookieStorage.length = (document.cookie.match(/\=/g) || window.cookieStorage).length;
}

/*
    Moment Configuration to Spanish Language
*/
moment.locale('es', {
    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    ordinal: function (number) {
        return [
            'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez',
            'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve',
            'veinte', 'veintiún', 'veintidós', 'veintitrés', 'veinticuatro', 'veinticinco', 'veintiseis', 'veintisiete', 'veintiocho', 'veintinueve',
            'treinta', 'treinta y un'
        ][number - 1];
    }
});

var app = angular.module('baseApp', [
    /**
     * Globals
     */
    'angular-loading-bar',
    'ngResource',
    'ui.router',

    /**
     * Locals
     */
    _module.name
]);

app.factory('TokenInterceptor', ['$q', '$window', '$location', function ($q, $window, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};

            if (/\.(html|js|css)$/gi.test(config.url)) {
                delete config.headers.Authorization;
            } else if (cookieStorage.getItem('ry_user_token')) {
                config.headers.Authorization = 'Bearer ' + cookieStorage.getItem('ry_user_token');
            }

            return config;
        },

        requestError: function (rejection) {
            return $q.reject(rejection);
        },

        responseError: function (rejection) {
            if (rejection.data) {
                rejection.data.data = rejection.data.data || {};

                if (rejection.data.data.message) {
                    alert(rejection.data.data.message);
                } else {
                    alert("Ocurrió un error, por favor inténtalo más tarde");
                }
            } else if (rejection.statusText && rejection.statusText != "") {
                alert(rejection.statusText);
            } else {
                alert("Error inesperado. Por favor borre la cache y recargue la página.");
            }

            return $q.reject(rejection);
        }
    };
}]);

/**
 * Config
 */
app.config(
    [
        '$httpProvider', '$locationProvider', function ($httpProvider, $locationProvider) {
            delete $httpProvider.defaults.headers.common['X-Requested-With'];

            $httpProvider.defaults.useXDomain = true;
            $httpProvider.defaults.timeout = 73154;
            $httpProvider.interceptors.push('TokenInterceptor');

            //check browser support
            /*if (window.history && window.history.pushState) {
                $locationProvider.html5Mode(true);
            }*/
        }
    ]
).run();
