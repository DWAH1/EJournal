'use strict';

app.controller('reportControlProgressCtrl', ['$scope', '$state',
    '$routeParams', '$stateParams', '$http', 'reportsFactory',
    function ($scope, $state, $routeParams, $stateParams, $http, reportsFactory) {

    // retrieve name of report
    let title = _.find(reportsFactory, {id: $state.current.name}).name;
    // create
    (new StudyLoadReport(title)).init($http, $scope);

    // report.init($http);

    // start create report
    // let report = new StudyLoadReport(title);
    // report.getGroups($http).then(function (res) {
    //     report.setGroups = res;
    //
    //     report.getSubjects($http).then(function (res) {
    //        report.setSubjects = res;
    //
    //        report.getStudents($http).then(function (res) {
    //           report.setStudents = res;
    //           console.log("report", report);
    //
    //           $scope.report = report; // render report
    //        });
    //
    //     });
    // });
    // end create report
    $scope.changeReport = function () {
        $scope.report.students = $scope.report.students.concat([{id: 4, name: "NEW"}]);
    };


    $scope.chooseGroup = function (group) {
    };

    $scope.printReport = function () {
        window.print();
    };

    $scope.downloadReport = function () {
        report.download();
    };

}]);




