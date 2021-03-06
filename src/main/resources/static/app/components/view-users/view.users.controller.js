(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('ViewUsersController', ViewUsersController);

    ViewUsersController.$inject = ['$state', '$scope', '$q', 'uiGridConstants', 'UserFactory', 'ToasterService', 'DialogService'];

    function ViewUsersController($state, $scope, $q, uiGridConstants, UserFactory, ToasterService, DialogService) {
        var vm = this,
            toasterService = ToasterService,
            dialogService = DialogService,
            cellTemplate = '<div title="{{COL_FIELD}}" class="ui-grid-cell-contents" style="cursor: pointer;">{{COL_FIELD}}</div>';

        vm.gridApi = null;
        vm.selectedRow = null;
        vm.usersGrid = {
            enableRowSelection: true,
            enableRowHeaderSelection: false,
            multiSelect: false,
            enableSelectAll: false,
            enableGridMenu: true,
            enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
            onRegisterApi: function(gridApi) {
                vm.gridApi = gridApi;
                gridApi.selection.on.rowSelectionChanged($scope, function(row, event) {
                    vm.selectedRow = gridApi.selection.getSelectedRows().length > 0 ? row.entity : null;
                });
            },
            columnDefs: [
                {
                    displayName: 'Last Name',
                    field: 'lastName',
                    cellTemplate: cellTemplate,
                    headerTooltip: true,
                    cellTooltip: true,
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 0
                    }
                },
                {
                    displayName: 'First Name',
                    field: 'firstName',
                    cellTemplate: cellTemplate,
                    headerTooltip: true,
                    cellTooltip: true,
                    sort: {
                        direction: uiGridConstants.ASC,
                        priority: 1
                    }
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
                    field: 'stateDto.name',
                    cellTemplate: cellTemplate,
                    headerTooltip: true,
                    cellTooltip: true
                },
                {
                    displayName: 'Date of Birth',
                    field: 'birthDate',
                    cellTemplate: '<div title="{{COL_FIELD | date:\'MM/dd/yyyy\'}}" class="ui-grid-cell-contents" style="cursor: pointer;">{{COL_FIELD | date:\'MM/dd/yyyy\'}}</div>',
                    headerTooltip: true,
                    cellTooltip: true
                }
            ]
        };

        vm.openMenu = openMenu;
        vm.editUser = editUser;
        vm.deleteUser = deleteUser;

        initialize();

        function initialize() {
            var promises = {
                getUsers: getUsers()
            };
            $q.all(promises).then(function (response) {
                vm.usersGrid.data = response.getUsers;
            });
        }

        function openMenu($mdMenu, ev) {
            $mdMenu.open(ev);
        }

        function editUser(createNew) {
            $state.go('root.createUser', {userId: createNew ? null : vm.selectedRow.userId});
        }

        function deleteUser() {
            $q.when(dialogService.confirmDeleteDialog('Delete User', 'Are you sure you want to delete this user?')).then(function (confirm) {
                if (confirm) {
                    UserFactory.deleteUser(vm.selectedRow.userId).then(function (response) {
                        vm.usersGrid.data = vm.usersGrid.data.filter(function (row) {
                            return row.userId !== vm.selectedRow.userId;
                        });
                        vm.selectedRow = null;
                        toasterService.showToastSuccess('User successfully deleted');
                    }, function (error) {
                        toasterService.showToastError('Error: Could not delete user');
                    });
                }
            });

        }

        function getUsers() {
            return UserFactory.getUsers().then(function (response) {
                return response.data;
            }, function (error) {
                toasterService.showToastError('Error retrieving users');
            });
        }
    }
})();
