(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('ViewUsersController', ViewUsersController);

    ViewUsersController.$inject = ['$state', '$scope', '$q', 'uiGridConstants', 'UserFactory'];

    function ViewUsersController($state, $scope, $q, uiGridConstants, UserFactory) {
        var vm = this;

        var cellTemplate = '<div title="{{COL_FIELD}}" class="ui-grid-cell-contents" style="cursor: pointer;">{{COL_FIELD}}</div>';

        vm.selectedRow = {};
        vm.rowSelected = false;
        vm.usersGrid = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            enableSelectAll: false,
            enableGridMenu: true,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            onRegisterApi: function(gridApi) {
                gridApi.selection.on.rowSelectionChanged($scope, function(row, event) {
                    vm.rowSelected = gridApi.selection.getSelectedRows().length > 0;
                    vm.selectedRow = vm.rowSelected ? row.entity : null;
                });
            },
            columnDefs: [
                {
                    displayName: 'Last Name',
                    field: 'lastName',
                    cellTemplate: cellTemplate,
                    headerTooltip: true,
                    cellTooltip: true
                },
                {
                    displayName: 'First Name',
                    field: 'firstName',
                    cellTemplate: cellTemplate,
                    headerTooltip: true,
                    cellTooltip: true
                },
                {
                    displayName: 'Email',
                    field: 'emailAddress',
                    cellTemplate: cellTemplate,
                    headerTooltip: true,
                    cellTooltip: true
                },
                {
                    displayName: 'State',
                    field: 'state',
                    cellTemplate: cellTemplate,
                    headerTooltip: true,
                    cellTooltip: true
                },
                {
                    displayName: 'Date of Birth',
                    field: 'birthDate',
                    cellTemplate: cellTemplate,
                    headerTooltip: true,
                    cellTooltip: true
                }
            ]
        };

        vm.openMenu = openMenu;
        vm.editUser = editUser;

        initialize();

        function initialize() {
            var promises = {
                getUsers: getUsers()
            };
            $q.all(promises).then(function (response) {
                vm.usersGrid.data = [
                    {
                        userId: 0,
                        firstName: 'joe',
                        lastName: 'smith',
                        emailAddress: 'j@j',
                        state: 'CA',
                        birthDate: '2/10/10'
                    }
                ];
                // vm.usersGrid.data = response.getUsers;
            });
        }

        function openMenu($mdMenu, ev) {
            $mdMenu.open(ev);
        }

        function editUser() {
            $state.go('root.createUser', {userId: vm.selectedRow.userId});
        }

        function getUsers() {
            return UserFactory.getUsers().then(function (response) {
                return response.data;
            }, function (error) {
                alert('error retrieving users');
            })
        }
    }
})();
