(function () {
    'use strict';

    angular
        .module('DemoApp')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http'];

    function UserFactory($http) {

        var factory = {
            getUsers: getUsers,
            submitUser: submitUser
        };

        return factory;

        function getUsers() {
            return $http.get('v1/users');
        }

        function submitUser(userDto) {
            return $http.post('v1/user', userDto);
        }
    }
})();
