'use strict';

class ControlProgress extends Report {
    constructor(name) {
        super(name);
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

            $scope.currentSubject = new Subject(currentSubjectId, 45, 55);

            let groupsOfSubject = _.filter(response.data, {subject_id: currentSubjectId});

            console.log(groupsOfSubject);

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

                $http({
                    method: 'POST',
                    url: API.urls().students_group,
                    data: $scope.report.groups[0]
                }).then(function successCallback(response) {
                    $scope.report.students = response.data;
                    $scope.isLoading = false;
                });

                // $scope.report.students = studentsFactory;

            });

        });

    }

}