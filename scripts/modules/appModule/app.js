let app = angular.module('appModule', ['ngRoute', 'ngCookies', 'authorizationModule', 'securityModule']);

app.config(function($routeProvider) {

    $routeProvider
        .when('/reports', {
            templateUrl: 'views/reports.html',
            controller: 'reportsCtrl'
        })
        .when('/reports/:reportId?', {
            templateUrl: 'views/report.html',
            controller: 'reportCtrl'
        })
        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'settingsCtrl'
        })
        .otherwise({
            redirectTo: '/redirect'
        });
});