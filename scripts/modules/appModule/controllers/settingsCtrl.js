app.controller('settingsCtrl', ['$scope', '$http', 'reportsFactory', function ($scope, $http, reportsFactory) {

    $scope.reports = reportsFactory;

    let successJBox = new jBox('Modal', {
        id: "jBoxSuccess",
        width: 400,
        animation: 'pulse',
        content: $('#successPopup')
    });

    let failureJBox = new jBox('Modal', {
        id: "jBoxFailure",
        width: 400,
        animation: 'pulse',
        content: $('#failurePopup')
    });


    $scope.createGroup = function (groupNumber, groupFaculty) {

        if (!$scope.groupCreate.$valid)
            return;

        $scope.isLoading = true;
        let req = {
            method: 'POST',
            url: API.urls().groups,
            headers: {
                'Content-Type': 'application/json'
            },
            params: { group: {number: groupNumber, faculty: groupFaculty} }
        };

        $http(req).then(function(res) {
            // success
            console.log(res);
            $scope.isLoading = false;
            successJBox.open();
        }, function(res){
            // failure
            console.log(res);
            failureJBox.setContent("<div class='text-center'>" + res.statusText + "</div>");

            $scope.isLoading = false;
            failureJBox.open();
        });

    };

    $scope.createSubject = function (subjectName) {

        if (!$scope.subjectCreate.$valid)
            return;

        $scope.isLoading = true;
        let req = {
            method: 'POST',
            url: API.urls().subjects,
            headers: {
                'Content-Type': 'application/json, text/plain, */*'
            },
            params: { name: subjectName }
        };

        $http(req).then(function(res) {
            // success
            console.log(res);
            successJBox.setContent("<div class='text-center'>" + res.statusText + "</div>");

            $scope.isLoading = false;
            successJBox.open();
        }, function(res){
            // failure
            $scope.isLoading = false;
            failureJBox.open();
            console.log(res);
        });

        // let url = 'https://teacher-journal2.herokuapp.com/subjects.json';
        // let req = {subject: {name: subjectName}};
        // $http.post(url, req).then(function(res) {console.log(res);}, function(res){console.log(res);});

    };

    //POST   /subjects.json       params: { name }

}]);