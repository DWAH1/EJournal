let app = angular.module('appModule', ['ngRoute', 'ui.router', 'ngCookies', 'authorizationModule', 'securityModule']);

app.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

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
        .state('controlProgress', {
            url: '/controlProgress',
            parent: 'reports',
            views: {
                'bookDetails@reports': {
                    templateUrl: 'views/reports/controlOfProgress.html',
                    controller: 'reportControlProgressCtrl'
                }
            }
        })
        .state('studyLoad', {
            url: '/studyLoad',
            parent: 'reports',
            views: {
                'bookDetails@reports': {
                    templateUrl: 'views/reports/studyLoad.html',
                    controller: 'reportStudyLoadCtrl'
                }
            }
        })
        .state('report3', {
            url: '/report3',
            parent: 'reports',
            views: {
                'bookDetails@reports': {
                    templateUrl: 'views/reports/other.html',
                    controller: 'reportControlProgressCtrl'
                }
            }
        })
        .state("otherwise", {
            url : '/otherwise'
        });

});