(function() {
    'use strict';

    angular
        .module('DemoApp')
        .service('DialogService', DialogService);

    DialogService.$inject = ['$mdDialog'];

    function DialogService($mdDialog) {
        var service = this;

        service.confirmDeleteDialog = confirmDeleteDialog;

        function confirmDeleteDialog(modalTitle, modalText) {
            return $mdDialog.show({
                clickOutsideToClose: true,
                locals: {
                    modalTitle: modalTitle,
                    modalText: modalText
                },
                bindToController: true,
                templateUrl: 'app/shared/view/confirm-delete-dialog.html',
                controllerAs: 'vm',
                controller: confirmDeleteDialogController
            }).then(function (acceptCallback) {
                return true;
            }, function(cancelCallback) {
                return false;
            });

            function confirmDeleteDialogController($mdDialog) {
                var vm = this;

                vm.modalText = modalText;
                vm.modalTitle = modalTitle;

                vm.cancel = cancel;
                vm.confirmDelete = confirmDelete;

                function cancel() {
                    $mdDialog.cancel();
                }

                function confirmDelete() {
                    vm.processing = true;
                    $mdDialog.hide();
                }
            }
        }

    }
})();
