class Report {

    constructor(name, $http, $scope) {
        $scope.title = this.title = name;

        Report.getSubjects($http, $scope);
        Report.getGroups($http, $scope);
        Report.getStudents($http, $scope);
    }

    static getSubjects($http, $scope) {

        $http({
            method: 'GET',
            url: 'https://teacher-journal2.herokuapp.com/subjects.json'
        }).then(function successCallback(response) {
            $scope.subjects = response.data;
        });


    }

    static getGroups($http, $scope) {

        $http({
            method: 'GET',
            url: 'https://teacher-journal2.herokuapp.com/groups.json'
        }).then(function successCallback(response) {
            $scope.groups = response.data;
        });

    }

    static getStudents($http, $scope) {

        $http({
            method: 'GET',
            url: 'https://teacher-journal2.herokuapp.com/students.json'
        }).then(function successCallback(response) {
            $scope.students = response.data;
        });

    }

    render() {}

    download() {}

}