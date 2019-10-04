(function() {
    angular
        .module('DemoApp', ['ui.router', 'oc.lazyLoad', 'ui.grid', 'ui.grid.selection', 'ngMaterial', 'ngMessages', 'ngAnimate'])
        .config(Config);

    Config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$urlMatcherFactoryProvider'];

    function Config($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider, $urlMatcherFactoryProvider) {
        var resolve = function resolve(name, files) {
            return {
                load: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: name,
                        files: files
                    });
                }
            }
        };
        $locationProvider.html5Mode(true);
        $urlMatcherFactoryProvider.strictMode(true);
        $urlRouterProvider.otherwise('/viewUsers');

        $stateProvider
            .state('root', {
                url: '',
                abstract: true,
                views: {
                    'header': {
                        templateUrl: 'app/components/header/header.html',
                        controller: 'HeaderController as vm'
                    }
                },
                resolve: resolve('root', [
                    'app/components/header/header.controller.js'
                ])
            })
            .state('root.viewUsers', {
                url: '/viewUsers',
                views: {
                    'container@': {
                        templateUrl: 'app/components/view-users/view-users.html',
                        controller: 'ViewUsersController as vm'
                    }
                },
                resolve: resolve('viewUsers', [
                    'app/components/view-users/view.users.controller.js',
                    'app/shared/service/dialog.service.js'
                ])
            })
            .state('root.createUser', {
                url: '/createUser',
                views: {
                    'container@': {
                        templateUrl: 'app/components/create-user/create-user.html',
                        controller: 'CreateUserController as vm'
                    }
                },
                params: {
                    userId: null
                },
                resolve: resolve('createUser', [
                    'app/components/create-user/create.user.controller.js'
                ])
            })
    }
})();

(function () {
    angular
        .module('DemoApp')
        .run(Run);

    Run.$inject = ['$ocLazyLoad'];

    function Run($ocLazyLoad) {
        //Load shared files needed on all pages
        $ocLazyLoad.load([
            'app/shared/service/toaster.service.js',
            'app/shared/factory/user.factory.js'
        ]);
    }
})();
