'use strict';

class StudyLoadReport extends Report {
    constructor(name, $http, $scope) {
        super(name, $http, $scope);
    }

    render() {
        alert("I'm children!");
    }

    download() {
        alert("download");
    }
}