'use strict';

class StudyLoad extends Report {
    constructor(name) {
        super(name);
    }

    download() {
        alert("download");
    }

    init($http, $scope) {
        let report = this;
        report.getSubjects($http).then(function (res) {
            report.setSubjects = res;
            // add to scope
            $scope.report = report;
            $scope.isLoading = false;
        });
    }

    changeSubject($http, $scope, currentSubjectId) {

        $http({
            method: 'GET',
            url: API.urls().subject_groups
        }).then(function successCallback(response) {

            let groupsOfSubject = _.filter(response.data, {subject_id: currentSubjectId});

            $http({
                method: 'GET',
                url: API.urls().groups
            }).then(function successCallback(response) {
                // retrieve from all groups group assigned to current subject
                let currentGroups = [];
                for (let group in groupsOfSubject) {
                    let res = _.find(response.data, {id: groupsOfSubject[group].group_id});
                    if (res) {
                        currentGroups = currentGroups.concat(res);
                    }
                }

                $scope.report.groups = currentGroups;
                // test
                $scope.report.groups = $scope.report.groups.concat([{number: 454}, {number: 999}, {number: "930-П"}]);
                $scope.isLoading = false;
            });

        });

    }

}