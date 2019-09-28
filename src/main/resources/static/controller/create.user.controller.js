(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$state'];

    function CreateUserController($state) {
        var vm = this;

        console.log("create user works!!!!!!");

        vm.viewUsers = viewUsers;

        function viewUsers() {
            $state.go('root.viewUsers');
        }
    }
})();
