'use strict';

var config = require('../../config');

var ModuleRouter = function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise("/bienvenido");

    $stateProvider
		.state('main', {
			url: '/bienvenido',
			views: {
				'body': {
					templateUrl: 'views/hello/world.html' + config.wcmode,
					controller: 'BasicController',
					controllerAs: 'Ctrl'/*,
					resolve: {
						data: ['MyModel', function (MyModel) {
							return MyModel.banners({
								data_id: data.id
							}).$promise;
						}]
					}*/
				}
			}
		})
	;
};

ModuleRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

module.exports = ModuleRouter;
