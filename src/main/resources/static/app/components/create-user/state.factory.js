(function() {
    'use strict';

    angular
        .module('DemoApp')
        .factory('StateFactory', StateFactory);

    StateFactory.$inject = ['$http'];

    function StateFactory($http) {
        var factory = {
            getStates: getStates
        };
        return factory;

        function getStates() {
            return $http.get('v1/states');
        }
    }
})();
