app.controller('reportsCtrl', ['$scope', '$location', '$userProvider', 'authorizationFactory', 'reportsFactory',
    function($scope, $location, $userProvider, authorizationFactory, reportsFactory) {

        $scope.reports = reportsFactory;

        $scope.logOutClick = function () {
            authorizationFactory.logOut();
            $scope.goTo('/login');
        };

}]);

app.factory('reportsFactory', function () {
    return [
        {
            id: 1,
            name: "Учебная нагрузка"
        },
        {
            id: 2,
            name: "Посещяемость"
        },
        {
            id: 3,
            name: "Другой отчет"
        }
    ]
});