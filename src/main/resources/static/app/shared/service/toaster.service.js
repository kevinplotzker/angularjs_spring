(function () {
    'use strict';

    angular
        .module('DemoApp')
        .service('ToasterService', ToasterService);

    ToasterService.$inject = ['$mdToast'];

    function ToasterService($mdToast) {
        var service = this;

        service.showToastError = showToastError;
        service.showToastSuccess = showToastSuccess;

        function showToastError(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom right')
                    .toastClass('md-toast-error')
                    .hideDelay(3000)
                    .action('OK')
            );
        }

        function showToastSuccess(message) {
            $mdToast.show(
                $mdToast.simple()
                    .textContent(message)
                    .position('bottom right')
                    .toastClass('md-toast-success')
                    .hideDelay(3000)
                    .action('OK')
            );
        }
    }
})();
