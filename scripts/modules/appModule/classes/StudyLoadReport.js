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
        report.getSubjects($http).then(function (res) {
            report.setSubjects = res;

            console.log("sub", res[0].id);


            report.getGroups($http).then(function (res) {
                report.setGroups = res;

                report.getStudents($http).then(function (res) {
                    report.setStudents = res;
                    console.log("report", report);
                    // add to scope
                    $scope.report = report;
                });
            });
        });
    }

    changeSubject($http, $scope, currentSubjectId) {

        $http({
            method: 'GET',
            url: API.urls().subject_groups
        }).then(function successCallback(response) {

            // let test = [
            //     {id:"5a060f67-436f-402a-bdd6-fdcce6d9e2a2", subject_id:"d686ed7e-db12-4906-8117-28dd2630ad1d",group_id:"a8a71256-38da-4211-acd3-be3be3a81b18",year:"2016-2017"},
            //     {id:"ffb3eb98-b2a5-4579-a45e-62400921910b",subject_id:"c2926c90-7c80-4e9c-aaff-64e0672a6175",group_id:"a8a71256-38da-4211-acd3-be3be3a81b18",year:"2016-2017"},
            //     {id:"6803e081-055d-43dd-9391-55917ceb2957",subject_id:"db21a20f-1f85-4c16-9b22-b6154873e5b4",group_id:"adc8589d-7ed6-4617-a1fb-65bfc292e012",year:"1234"},
            //     {id:"eddf53c0-da14-40cd-b052-ee3394804cd1",subject_id:"de0c9995-29cc-4663-89e8-41cf77de1a4c",group_id:"df3c3310-b4a0-44c2-98fd-e6720725bc27",year:"1234"},
            //     {id:"ffb3eb98-b2a5-4579-a45e-62400921910b",subject_id:"c2926c90-7c80-4e9c-aaff-64e0672a6175",group_id:"ffffffffffffffffffffffffffffffffffff",year:"2016-2017"}
            // ];

            let groupsOfSubject = _.filter(response.data, {subject_id: currentSubjectId});

            $http({
                method: 'GET',
                url: API.urls().groups
            }).then(function successCallback(response) {
                let currentGroups = [];
                for (let group in groupsOfSubject) {
                    console.log("GGGGGG=>", groupsOfSubject);
                    let g = _.find(response.data, {id: groupsOfSubject[group].group_id});
                    if (g) {
                        currentGroups = currentGroups.concat(g);
                    }
                }

                $scope.report.groups = currentGroups;

                console.log("CURRENT", currentGroups);

            });

            // console.log("SGS", test);
            console.log("SGS", response.data);
            console.log("CI", currentSubjectId);
            console.log("GG", groupsOfSubject);
        });

    }

}