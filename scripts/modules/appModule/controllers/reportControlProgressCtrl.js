'use strict';

app.controller('reportControlProgressCtrl', ['$scope', '$state', '$routeParams', '$stateParams', '$http', 'reportsFactory',
    function ($scope, $state, $routeParams, $stateParams, $http, reportsFactory) {


    let title = _.find(reportsFactory, {id: $state.current.name}).name;
    let report = new StudyLoadReport(title, $http, $scope);



    $scope.chooseGroup = function (group) {
    };

    $scope.printReport = function () {
        window.print();
    };

    $scope.downloadReport = function () {
        report.download();
    };

}]);




