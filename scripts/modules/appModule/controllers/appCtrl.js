app.controller('appCtrl', ['$scope', '$cookies', '$location', '$pagesSecurityService',
    '$userProvider', 'authorizationFactory',
    function($scope, $cookies, $location, $pagesSecurityService,
             $userProvider, authorizationFactory){

        // $cookies.remove('user');
        // alert("HERE");

        let failureJBox = new jBox('Modal', {
            id: "jBoxFailure",
            width: 400,
            animation: 'pulse',
            content: $('#failurePopup')
        });

        // for use inline of views
        $scope.goTo = function(path) {
            $location.path(path);
        };
        // route history
        $scope.history = [];

        // extend the scope
        angular.extend($scope, $userProvider, true);

        // restore user after full refresh page or close app
        if ($cookies.get('user')) {
            authorizationFactory.restoreUserFromCookies($cookies.getObject('user'));

            if ($cookies.get('lastURL'))
                $location.path($cookies.get('lastURL'));
            else
                $location.path('/reports');
        }

        // access control
        $scope.$on('$locationChangeStart', function (event, nextUrl, prevUrl) {

            authorizationFactory.updateUserCookies();

            if ($location.path() != '/login' || nextUrl.indexOf('login') == -1) {
                if (!$pagesSecurityService.checkAuthorize($location.path())) {
                    failureJBox.setContent("Access denied!").open();
                    $location.path(prevUrl.split('#')[1]);
                }
            } else if ($location.path() == '/login' && $userProvider.getUser()) { // already authorized
                $location.path(prevUrl.split('#')[1]);
            }

            if ($location.path() == '/otherwise') {
                $location.path( $scope.history[$scope.history.length - 2] );
            }

            // add to history current location
            $scope.history.push($location.path());

        });

        // save lastURL
        $(window).on('unload',function(){
            $cookies.put('lastURL', $location.path());
        });
}]);