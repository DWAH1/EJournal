app.controller('reportsCtrl', ['$scope', '$location', '$userProvider', 'authorizationFactory', 'reportsFactory',
    function($scope, $location, $userProvider, authorizationFactory, reportsFactory) {

        $scope.reports = reportsFactory;

        $scope.logOutClick = function () {
            authorizationFactory.logOut();
            $scope.goTo('/login');
        };

}]);

app.factory('reportsFactory', function () {

    let typeReportEnum = {
        TrainingLoad: 0,
        AccountingStudentWork: 1,
        Other: 2
    };

    return [
        {
            id: "report1",
            type: typeReportEnum.TrainingLoad,
            name: "Учебная нагрузка"
        },
        {
            id: "report2",
            type: typeReportEnum.AccountingStudentWork,
            name: "Посещяемость"
        },
        {
            id: "report3",
            type: typeReportEnum.Other,
            name: "Другой отчет"
        }
    ]
});