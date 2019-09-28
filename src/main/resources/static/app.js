var myApp = angular
    .module('DemoApp', ['ui.router', 'oc.lazyLoad', 'ngMaterial', 'ngMessages', 'ngAnimate']);

myApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider) {
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

    // $locationProvider.html5Mode(true);

    // $locationProvider.html5Mode({
    //     enabled: true,
    //     requireBase: true
    // });
    $urlRouterProvider.otherwise('/viewUsers');
    // $ocLazyLoadProvider.config({
    //     loadedModules: ['DemoApp'],
    //     // asyncLoader: require,
    //     debug: false
    // });

    $stateProvider
        .state('root',{
            url: '',
            abstract: true,
            views: {
                'header': {
                    templateUrl: 'view/header.html',
                    controller: 'HeaderController as vm'
                }
            },
            resolve: resolve('root', [
                'controller/header.controller.js'
            ])
        })
        .state('root.viewUsers', {
            url: '/viewUsers',
            // data: {
            //     authenticated: true
            // },
            views: {
                'container@': {
                    templateUrl: 'view/view-users.html',
                    controller: 'ViewUsersController as vm'
                }
            },
            resolve: resolve('viewUsers', [
                'controller/view.users.controller.js'
            ])
        })
        .state('root.createUser', {
            url: '/createUser',
            // data: {
            //     authenticated: true
            // },
            views: {
                'container@': {
                    templateUrl: 'view/create-user.html',
                    controller: 'CreateUserController as vm'
                }
            },
            resolve: resolve('createUser', [
                'controller/create.user.controller.js'
            ])
        })
        // .state('root',{
        //     url: '',
        //     abstract: true,
        //     views: {
        //         'header': {
        //             templateUrl: 'static/view/header.html',
        //             controller: 'HeaderController as vm'
        //         }
        //     },
        //     resolve: resolve('root', [
        //         'controller/header.controller.js'
        //     ])
        // })
        // .state('root.dash', {
        //     url: '/dash',
        //     views: {
        //         'container@' : {
        //             templateUrl: 'view/dash.html',
        //             controller: 'DashController as vm'
        //         }
        //     },
        //     resolve: resolve('dash', [
        //         'controller/dash.controller.js'
        //     ])
        // });

}]);
