(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('ViewUsersController', ViewUsersController);

    ViewUsersController.$inject = ['$state'];

    function ViewUsersController($state) {
        var vm = this;

        console.log("view user works!!!!!!");

        vm.createUser = createUser;

        function createUser() {
            $state.go('root.createUser');
        }
    }
})();
