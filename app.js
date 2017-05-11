var app = angular.module('journal-client', []); // init module

app.controller('ctrl-init', function($scope, $http) {
  $http.get("https://teacher-journal2.herokuapp.com/students.json").then(function (response) {
  	  console.log(response);
      $scope.students = response.data;
  });
});