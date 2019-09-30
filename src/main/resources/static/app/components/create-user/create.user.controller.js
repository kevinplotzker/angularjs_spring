(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$state', 'UserFactory'];

    function CreateUserController($state, UserFactory) {
        var vm = this;

        vm.userName = null;

        vm.goToViewUsersPage = goToViewUsersPage;
        vm.submitUser = submitUser;

        function submitUser() {
            var userDto = {
                userName: vm.userName
            };
            UserFactory.submitUser(userDto).then(function (response) {
                $state.go('root.viewUsers');
            }, function (error) {
                console.log(error);
            })
        }

        function goToViewUsersPage() {
            $state.go('root.viewUsers');
        }
    }
})();
