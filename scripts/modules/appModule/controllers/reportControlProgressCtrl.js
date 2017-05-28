'use strict';

app.controller('reportControlProgressCtrl', ['$scope', '$state',
    '$routeParams', '$stateParams', '$http', 'reportsFactory',
    function ($scope, $state, $routeParams, $stateParams, $http, reportsFactory) {

    // retrieve name of report
    let title = _.find(reportsFactory, {id: $state.current.name}).name;
    // create and init report
    (new StudyLoadReport(title)).init($http, $scope);
    // $scope = new StudyLoadReport(title);


    $scope.changeReport = function () {
        $scope.report.students = $scope.report.students.concat([{id: 4, name: "NEW"}]);
    };

    $scope.changeSubject = function (id) {
        $scope.report.changeSubject($http, $scope, id);
    };

    $scope.chooseGroup = function (group) {
    };

    $scope.printReport = function () {
        window.print();
    };

    $scope.downloadReport = function () {
        $scope.report.download();
    };

}]);




