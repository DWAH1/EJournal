'use strict';

class StudyLoadReport extends Report {
    constructor(name) {
        super(name);
    }

    download() {
        alert("download");
    }

    init($http, $scope) {
        let report = this;
        report.getGroups($http).then(function (res) {
            report.setGroups = res;

            report.getSubjects($http).then(function (res) {
                report.setSubjects = res;

                report.getStudents($http).then(function (res) {
                    report.setStudents = res;
                    console.log("report", report);
                    // add to scope
                    $scope.report = report;
                });
            });
        });
    }

}