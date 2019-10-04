(function () {
    'use strict';

    angular
        .module('DemoApp')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http'];

    function UserFactory($http) {

        var factory = {
            getUsers: getUsers,
            getUser: getUser,
            submitUser: submitUser,
            deleteUser: deleteUser
        };

        return factory;

        function getUsers() {
            return $http.get('v1/users');
        }

        function getUser(userId) {
            return $http.get('v1/user/' + userId);
        }

        function submitUser(userDto) {
            return $http.post('v1/user', userDto);
        }

        function deleteUser(userId) {
            return $http.delete('v1/user/' + userId);
        }
    }
})();
