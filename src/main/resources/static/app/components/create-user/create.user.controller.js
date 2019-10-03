(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$state', 'UserFactory'];

    function CreateUserController($state, UserFactory) {
        var vm = this;

        vm.submitAdditional = false;
        vm.today = new Date();
        vm.user = {
            emailAddress: null,
            firstName: null,
            lastName: null,
            birthDate: null,
            streetAddress: null,
            city: null,
            state: {},
            zipCode: null
        };

        vm.states = [
            {
                name: 'California',
                abbreviation: 'CA',
                id: 1
            },
            {
                name: 'Oregon',
                abbreviation: 'OR',
                id: 2
            },
            {
                name: 'Washington',
                abbreviation: 'WA',
                id: 3
            }
        ];

        vm.submitUser = submitUser;
        vm.clearForm = clearForm;

        initialize();

        function initialize() {
            if ($state.params.userId !== null) {
                console.log($state.params.userId);
            }
        }

        function submitUser() {
            console.log(vm.user);
            UserFactory.submitUser(vm.user).then(function (response) {
                if (vm.submitAdditional) {

                    clearForm();
                } else {
                    $state.go('root.viewUsers');
                }
            }, function (error) {
                console.log(error);
            });
        }

        function clearForm() {

        }
    }
})();
