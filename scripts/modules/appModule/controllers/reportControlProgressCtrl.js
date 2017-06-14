'use strict';

app.controller('reportControlProgressCtrl', ['$scope', '$state',
    '$routeParams', '$stateParams', '$http', 'reportsFactory',
    function ($scope, $state, $routeParams, $stateParams, $http, reportsFactory) {

    $scope.isLoading = true;
    // retrieve name of report
    let title = _.find(reportsFactory, {id: $state.current.name}).name;
    // create and init report
    (new ControlProgress(title)).init($http, $scope);
    // $scope = new ControlProgress(title);


    $scope.changeReport = function () {
        $scope.report.students = $scope.report.students.concat([{id: 4, name: "NEW"}]);
    };

    $scope.printReport = function () {
        window.print();
    };

    $scope.changeSubject = function (id) {
        $scope.isLoading = true;
        $scope.report.changeSubject($http, $scope, id);
    };

    $scope.chooseGroup = function (group) {
    };

    $scope.downloadReport = function () {
        // $scope.isLoading = true;
        // $scope.repot_dom_elment = "control-progress";
        $scope.report.download("control-progress", $scope);
        // $scope.isLoading = false;
    };

}]);




