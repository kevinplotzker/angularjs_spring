(function() {
    'use strict';

    angular
        .module('DemoApp')
        .controller('DashController', DashController);

    DashController.$inject = ['$state'];

    function DashController($state) {
        var vm = this;
        console.log('dash works');
        vm.dashButton = dashButton;

        function dashButton() {
            $state.go('header');
        }

    }
})();
