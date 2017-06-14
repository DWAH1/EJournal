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

            $scope.report.students = [
                {
                    id: 1,
                    name: "Student1"
                },
                {
                    id: 2,
                    name: "Student2"
                },
                {
                    id: 3,
                    name: "Student3"
                },
                {
                    id: 4,
                    name: "Student4"
                },
                {
                    id: 5,
                    name: "Student5"
                },
                {
                    id: 6,
                    name: "Student6"
                },
                {
                    id: 7,
                    name: "Student7"
                },
                {
                    id: 1,
                    name: "Student1"
                },
                {
                    id: 2,
                    name: "Student2"
                },
                {
                    id: 3,
                    name: "Student3"
                }
            ];

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
                $scope.isLoading = false;
            });

        });

    }

}