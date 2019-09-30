(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('ViewUsersController', ViewUsersController);

    ViewUsersController.$inject = ['$state', '$q', 'UserFactory'];

    function ViewUsersController($state, $q, UserFactory) {
        var vm = this;

        vm.users = [];

        vm.goToCreateUserPage = goToCreateUserPage;

        initialize();

        function initialize() {
            var promises = {
                getUsers: getUsers()
            };
            $q.all(promises).then(function (response) {
                vm.users = response.getUsers;
            });
        }

        function getUsers() {
            return UserFactory.getUsers().then(function (response) {
                return response.data;
            }, function (error) {
                alert('error retrieving users');
            })
        }

        function goToCreateUserPage() {
            $state.go('root.createUser');
        }
    }
})();
