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
        if ($scope.currentSubject) {

            if ($(this).data('pk') == 1) {
                $("#cardPopup input[type='number']")
                    .attr("placeholder", "max " + $scope.currentSubject.pk_1);
            } else if ($(this).data('pk') == 2) {
                $("#cardPopup input[type='number']")
                    .attr("placeholder", "max " + $scope.currentSubject.pk_2);
            }

            $scope.pk = $(this).data('pk');
            $scope.thatCardTd = $(this);
            cardJBox.open();
        }
    });

    $scope.setCard = function () {
        $($scope.thatCardTd).html($scope.card);
        cardJBox.close();
    };

    $(document).on('click', 'td.comments', function () {
        $scope.thatCommentTd = $(this);
        commentJBox.open();
    });

    $scope.setComment = function () {
        $($scope.thatCommentTd).html($scope.comment);
        commentJBox.close();
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

    $scope.unpassed = function () {
        $scope.report.unpassed_students = [];

        for (let student in $scope.report.students) {
            if (!$scope.report.students[student].pk_1 || !$scope.report.students[student].pk_2) {
                console.log($scope.report.students[student].name);
                $scope.report.unpassed_students =
                    $scope.report.unpassed_students.concat($scope.report.students[student]);
            }
        }

        unpassedJBox.open();
    };

    function initJbox() {
        if (window.editJBox) {
            window.editJBox.destroy();
        }

        if (window.attendJBox) {

            window.attendJBox.destroy();
            window.marksJBox.destroy();
            window.dateJBox.destroy();
            window.commentJBox.destroy();
            window.unpassedJBox.destroy();

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

            window.commentJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#commentPopup')
            });

            window.unpassedJBox = new jBox('Modal', {
                id: "jBoxFailure",
                width: 400,
                height: 500,
                animation: 'pulse',
                content: $('#unpassedPopup')
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

            window.commentJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#commentPopup')
            });

            window.unpassedJBox = new jBox('Modal', {
                id: "jBoxFailure",
                width: 400,
                height: 500,
                animation: 'pulse',
                content: $('#unpassedPopup')
            });
        }
    }

}]);




