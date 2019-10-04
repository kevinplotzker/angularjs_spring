(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$state', '$scope', '$q', 'UserFactory', 'ToasterService'];

    function CreateUserController($state, $scope, $q, UserFactory, ToasterService) {
        var vm = this,
            toasterService = ToasterService;

        vm.submitAdditional = false;
        vm.today = new Date();
        vm.user = {};

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
                $q.when(getUser($state.params.userId).then(function (response) {
                    vm.user = response;
                }));
            } else {
                resetUserProperties();
            }
        }

        function resetUserProperties() {
            vm.user = {
                userId: null,
                emailAddress: null,
                firstName: null,
                lastName: null,
                birthDate: null,
                streetAddress: null,
                city: null,
                state: {},
                zipCode: null
            };
        }

        function getUser(userId) {
            return UserFactory.getUser(userId).then(function (response) {
                return response.data;
            }, function(error) {
                console.log(error);
                toasterService.showToastError('Error retrieving user details');
            });
        }

        function submitUser() {
            console.log(vm.user);
            UserFactory.submitUser(vm.user).then(function (response) {
                toasterService.showToastSuccess('User successfully saved');
                if (vm.submitAdditional) {
                    clearForm();
                } else {
                    $state.go('root.viewUsers');
                }
            }, function (error) {
                toasterService.showToastError('Error: Could not save user.');
            });
        }

        function clearForm() {
            $scope.createUserForm.$setUntouched();
            $scope.createUserForm.$setPristine();
            resetUserProperties();
        }
    }
})();
