class Report {

    constructor(title) {

        this.title = title;

        this.groups = null;
        this.subjects = null;
        this.students = null;
    }

    set setGroups(data) {
        this.groups = data;
    }

    set setSubjects(data) {
        this.subjects = data;
    }

    set setStudents(data) {
        this.students = data;
    }

    getGroups($http) {
        return $http({
            method: 'GET',
            url: API.urls().groups
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    getSubjects($http) {
        return $http({
            method: 'GET',
            url: API.urls().subjects
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    getStudents($http) {
        return $http({
            method: 'GET',
            url: API.urls().students
        }).then(function successCallback(response) {
            return response.data;
        });
    }

    download() {}

}