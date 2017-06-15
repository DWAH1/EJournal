'use strict';

app.controller('reportStudyLoadCtrl', ['$scope', '$state', '$routeParams',
    '$stateParams', '$http', 'reportsFactory', '$userProvider',
    function ($scope, $state, $routeParams, $stateParams, $http, reportsFactory, $userProvider) {

    initJbox();
    console.log($userProvider.getUserRole());
    // console.log($userProvider.getUserRole().indexOf(0) != -1 ? true : false);

    $scope.isReadOnly = $userProvider.getUserRole().indexOf(0) != -1 ? false : true;
    $scope.isLoading = true;

    // retrieve name of report
    let title = _.find(reportsFactory, {id: $state.current.name}).name;
    // create and init report
    (new StudyLoad(title)).init($http, $scope);

    $scope.printReport = function () {
        window.print();
    };

    $scope.changeSubject = function (id) {
        $scope.isLoading = true;
        $scope.report.changeSubject($http, $scope, id);
    };

    $scope.range = function(min, max, step) {
        step = step || 1;
        let input = [];
        for (let i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.downloadReport = function () {
        $scope.report.download("study-load");
    };

    $(document).on('click', 'td', function () {
        $scope.thatCurentTd = $(this);
        editJBox.open();
    });

    $scope.setEdit = function () {
        $($scope.thatCurentTd).html($scope.edit);
        editJBox.close();
    };

    $scope.sync = function () {
        $scope.isLoading = true;
        $http({
            url: API.urls().sync,
            method: "GET"
        }).then(function () {
            // success
            $scope.isLoading = false;
        }, function () { // optional
            $scope.isLoading = false;
        });
    };

    function initJbox() {
        if (window.editJBox) {
            window.editJBox.destroy();
            window.editJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#editPopup'),
            });
        } else {
            window.editJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#editPopup'),
            });
        }
    }

}]);



