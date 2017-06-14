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