/**
 * Created by ser on 11.05.17.
 */
app.controller('ctrl-init', function($scope, $http) {

    $http.get("https://teacher-journal2.herokuapp.com/students.json").then(function (response) {
        console.log(response);
        $scope.students = response.data;
    });

});