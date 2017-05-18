let app = angular.module('appModule', ['ngRoute', 'ui.router', 'ngCookies', 'authorizationModule', 'securityModule']);

app.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/otherwise');

    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'content@': {
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('settings', {
            url: '/settings',
            views: {
                'content@': {
                    templateUrl: 'views/settings.html',
                    controller: 'settingsCtrl'
                }
            }
        })
        .state('reports', {
            url: '/reports',
            views: {
                'content@': {
                    templateUrl: 'views/reports.html',
                    controller: 'reportsCtrl'
                }
            }
        })
        .state('report1', {
            url: '/report1',
            parent: 'reports',
            views: {
                'bookDetails@reports': {
                    templateUrl: 'views/reports/report1.html',
                    controller: 'reportCtrl'
                }
            }
        })
        .state('report2', {
            url: '/report2',
            parent: 'reports',
            views: {
                'bookDetails@reports': {
                    templateUrl: 'views/reports/report2.html',
                    controller: 'reportCtrl'
                }
            }
        })
        .state('report3', {
            url: '/report3',
            parent: 'reports',
            views: {
                'bookDetails@reports': {
                    templateUrl: 'views/reports/report3.html',
                    controller: 'reportCtrl'
                }
            }
        })
        .state("otherwise", {
            url : '/otherwise'
        });

});