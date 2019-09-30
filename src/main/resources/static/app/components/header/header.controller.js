(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$state'];

    function HeaderController($state) {
        var vm = this;
    }
})();
