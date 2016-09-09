'use strict';

var common = require('../../../libs/common');

var BasicController = function ($window, $state) {
    this.$window = $window;
	this.$state = $state;

    this.message = "Hola mundo!";
};

BasicController.prototype.change = function () {
    this.message = [
        "Aleatorio 1", "Aleatorio 2", "Aleatorio3"
    ][parseInt(Math.random()*3)];
};

BasicController.$inject = ['$window', '$state'];

module.exports = BasicController;
