/* global angular */

'use strict';

module.exports = angular.module('baseApp.hello', [])
	/*
        CARGAR AQUI LOS FACTORY
    .factory('Movie', require('./models/Movie'))
    .factory('Theatre', Theatre)
    .factory('City', City)
    .factory('General', General)
    .factory('User', User)*/

    //-- AQUI SE CREAN LOS FILTROS
    /*.filter('video_url', ['$sce', function ($sce) {
        return function (url) {
            return $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + url + "?html5=1");
        };
    }])*/

	//-- AQUI SE CARGAN LOS CONTROLADORES
    .controller('BasicController', require('./controllers/BasicController'))

    .config(require('./router'))
;
