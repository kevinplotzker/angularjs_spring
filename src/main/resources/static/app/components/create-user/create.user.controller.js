(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('CreateUserController', CreateUserController);

    CreateUserController.$inject = ['$state', '$scope', '$q', 'UserFactory', 'StateFactory', 'ToasterService'];

    function CreateUserController($state, $scope, $q, UserFactory, StateFactory, ToasterService) {
        var vm = this,
            toasterService = ToasterService;

        vm.pageTitle = 'Create New User';
        vm.submitAdditional = false;
        vm.user = {};
        vm.states = [];
        vm.pageLoaded = false;

        vm.submitUser = submitUser;
        vm.clearForm = clearForm;

        initialize();

        function initialize() {
            var promises = {
                getStates: getStates()
            };
            if ($state.params.userId !== null) {
                promises.getUser = getUser($state.params.userId);
            }
            $q.all(promises).then(function(response) {
                if (response.getUser) {
                    vm.user = response.getUser;
                    vm.pageTitle = 'Edit User: ' + vm.user.emailAddress;
                } else {
                    resetUserProperties();
                }
                vm.states = response.getStates;
                vm.pageLoaded = true;
            })
        }

        function getStates() {
            return StateFactory.getStates().then(function (response) {
                return response.data;
            }, function (error) {
                toasterService.showToastError('Error: Could not retrieve states');
            });
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
                stateDto: {
                    stateId: null
                },
                zipCode: null
            };
        }

        function getUser(userId) {
            return UserFactory.getUser(userId).then(function (response) {
                return response.data;
            }, function(error) {
                var message = getErrorMessage(error);
                if (!message) {
                    message = 'Error: Could not retrieve user details.'
                }
                toasterService.showToastError(message);
            });
        }

        function getErrorMessage(error) {
            switch (error.status) {
                case 404:
                    return error.data.errors[0];
                    break;
                case 409:
                    return error.data.errorMessage;
                    break;
                default:
                    return null;
            }
        }

        function submitUser() {
            console.log(vm.user);
            UserFactory.submitUser(vm.user).then(function (response) {
                toasterService.showToastSuccess('User successfully saved');
                if (vm.submitAdditional) {
                    clearForm();
                    vm.pageTitle = "Create New User";
                } else {
                    $state.go('root.viewUsers');
                }
            }, function (error) {
                var message = getErrorMessage(error);
                if (!message) {
                    message = 'Error: Could not save user.'
                }
                toasterService.showToastError(message);
            });
        }

        function clearForm() {
            $scope.createUserForm.$setUntouched();
            $scope.createUserForm.$setPristine();
            resetUserProperties();
        }
    }
})();
