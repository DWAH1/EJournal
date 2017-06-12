authorizationModule.controller('loginCtrl', ['$scope', 'authorizationFactory', '$location',
    function($scope, authorizationFactory, $location) {

        let loginJBox = new jBox('Modal', {
            width: 400,
            animation: 'pulse',
            content: $('#loginPopup')
        });

        $scope.isLoading = false;

        $scope.loginClick = function() {

            if (!$scope.form_authorization.$valid)
                return;

            $scope.isLoading = true;

            authorizationFactory.login($scope.login, $scope.pass).then(function (isAuth) {
                if (isAuth) {
                    alert("!" + isAuth);
                    loginJBox.close();
                    $location.path('/reports');
                } else {
                    $scope.isLoading = false;
                    // alert("Access denied!");
                }
            });

            // if (authorizationFactory.login($scope.login, $scope.pass)) {
            //     loginJBox.close();
            //     $location.path('/reports');
            // } else {
            //     alert('Access denied!');
            // }
        };

        $scope.openLoginPopup = function () {
            loginJBox.open();
        };

        $scope.openAboutPopup = function () {

            let aboutJBox = new jBox('Modal', {
                width: 400,
                animation: 'pulse',
                content: $('#aboutPopup')
            });

            aboutJBox.open();
        };

}]);