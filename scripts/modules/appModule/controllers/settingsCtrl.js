app.controller('settingsCtrl', ['$scope', '$http', 'reportsFactory', 'authorizationFactory',
    function ($scope, $http, reportsFactory, authorizationFactory) {

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

    $scope.logOutClick = function () {
        authorizationFactory.logOut();
        $scope.goTo('/login');
    };

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

    $scope.authsignIn = function (login, password) {
        login = "login"; password = "password";
        $scope.isLoading = true;

        // let req = {
        //     method: 'POST',
        //     headers: {'Content-Type': undefined},
        //     url: API.urls().sign_in,
        //     // transformRequest: function(obj) {
        //     //     var str = [];
        //     //     for (var key in obj) {
        //     //         if (obj[key] instanceof Array) {
        //     //             for(var idx in obj[key]){
        //     //                 var subObj = obj[key][idx];
        //     //                 for(var subKey in subObj){
        //     //                     str.push(encodeURIComponent(key) + "[" + idx + "][" + encodeURIComponent(subKey) + "]=" + encodeURIComponent(subObj[subKey]));
        //     //                 }
        //     //             }
        //     //         }
        //     //         else {
        //     //             str.push(encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]));
        //     //         }
        //     //     }
        //     //     return str.join("&");
        //     // },
        //     // data: JSON.stringify({ login: login, password: password })
        //     data: { login: login, password: password }
        // };

        // $http(req).then(function(res) {
        //     // success
        //     console.log(res);
        //     console.log(res.headers("X-CSRF-Token"));
        //     successJBox.setContent("<div class='text-center'>" + res.statusText + "</div>");
        //
        //     $scope.isLoading = false;
        //     successJBox.open();
        // }, function(res){
        //     // failure
        //     $scope.isLoading = false;
        //     failureJBox.open();
        //     console.log(res);
        // });

        let object = {
            login: login,
            password: password
        };

        let req = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        $http.post(API.urls().sign_in, object, req).then(
            function(res) { console.log(res); }, // success
            function(res) { console.log(res); }  // error
        );

    };

}]);