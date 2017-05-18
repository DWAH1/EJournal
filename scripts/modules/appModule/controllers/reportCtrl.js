app.controller('reportCtrl', ['$scope', '$routeParams', 'reportsFactory', function ($scope, $routeParams, reportsFactory) {
    // console.log($routeParams);
    let reportId = Number($routeParams.reportId);
    $scope.report = _.find(reportsFactory, {id: reportId});
}]);

