var myApp = angular
    .module('DemoApp', ['ui.router', 'oc.lazyLoad', 'ngMaterial', 'ngMessages', 'ngAnimate']);

myApp.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$urlMatcherFactoryProvider', function($stateProvider, $locationProvider, $urlRouterProvider, $ocLazyLoadProvider, $urlMatcherFactoryProvider) {
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
            views: {
                'container@': {
                    templateUrl: 'view/view-users.html',
                    controller: 'ViewUsersController as vm'
                }
            },
            resolve: resolve('viewUsers', [
                'controller/view.users.controller.js',
                'factory/user.factory.js'
            ])
        })
        .state('root.createUser', {
            url: '/createUser',
            views: {
                'container@': {
                    templateUrl: 'view/create-user.html',
                    controller: 'CreateUserController as vm'
                }
            },
            resolve: resolve('createUser', [
                'controller/create.user.controller.js',
                'factory/user.factory.js'
            ])
        })
}]);
