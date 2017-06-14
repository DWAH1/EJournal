'use strict';

app.controller('reportControlProgressCtrl', ['$scope', '$state', '$filter',
    '$routeParams', '$stateParams', '$http', 'reportsFactory',
    function ($scope, $state, $filter, $routeParams, $stateParams, $http, reportsFactory) {


    initJbox();

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
        $scope.report.download("control-progress", $scope);
    };


    // attend
    $(document).on('click', 'td.attend', function () {
        console.log("parent", $scope.$parent);
        $scope.thatAttendTd = $(this);
        attendJBox.open();
    });

    $scope.notAttend = function () {
        $($scope.thatAttendTd).html("Н");
        $($scope.thatAttendTd).css("background", "#f48686");
        attendJBox.close();
    };

    $scope.o = function () {
        $($scope.thatAttendTd).html("О");
        $($scope.thatAttendTd).css("background", "#b4ca7e");
        attendJBox.close();
    };

    $scope.attend = function attend() {
        $($scope.thatAttendTd).html("<span style='text-decoration: line-through'>Н<span>");
        $($scope.thatAttendTd).css("background", "#428BCA");
        attendJBox.close();
    };

    // marks
    $(document).on('click', 'td.marks', function () {
        $scope.thatMarksTd = $(this);
        marksJBox.open();
    });

    $scope.setMark = function(mark, color) {
        $($scope.thatMarksTd).html(mark);
        $($scope.thatMarksTd).css("background", color);
        marksJBox.close();
    };

    // date
    $(document).on('click', 'th.report-date', function () {
        $scope.thatDateTh = $(this);
        dateJBox.open();
    });

    $scope.setDate = function() {
        $($scope.thatDateTh).html($filter('date')(new Date( $scope.date),'MM.dd'));
        $($scope.thatDateTh).css("background", "#428BCA");

        // console.log("th-id", $($scope.thatDateTh).data("id"));
        $("#th-type-"+ $($scope.thatDateTh).data("id")).html($scope.type);

        // console.log("date", $filter('date')(new Date( $scope.date),'yyyy-MM-dd'));
        $scope.date = null;
        dateJBox.close();
    };

    $(document).on('click', 'td.marks_pk', function () {
        $scope.cardTypeTh = $(this);
        cardJBox.open();
    });

    function initJbox() {
        if (window.attendJBox && window.marksJBox && window.dateJBox) {

            window.attendJBox.destroy();
            window.marksJBox.destroy();
            window.dateJBox.destroy();

            window.attendJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#attendPopup'),
            });

            window.marksJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#marksPopup')
            });

            window.dateJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#datePopup')
            });

            window.cardJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#cardPopup')
            });

        } else {
            window.attendJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#attendPopup'),
            });

            window.marksJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#marksPopup')
            });

            window.dateJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#datePopup')
            });

            window.cardJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#cardPopup')
            });
        }
    }

}]);




