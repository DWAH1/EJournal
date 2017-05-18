authorizationModule.controller('loginCtrl', ['$scope', 'authorizationFactory', '$location',
    function($scope, authorizationFactory, $location) {
        $scope.loginClick = function() {

            if (authorizationFactory.login($scope.login, $scope.pass)) {
                $location.path('/reports');
            } else {
                alert('Access denied!');
            }
        }
}]);