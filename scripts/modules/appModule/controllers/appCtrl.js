app.controller('appCtrl', ['$scope', '$cookies', '$cookieStore', '$location', '$pagesSecurityService',
    '$userProvider', 'authorizationFactory',
    function($scope, $cookies, $cookieStore, $location, $pagesSecurityService,
             $userProvider, authorizationFactory){

        // console.log(_.find([{name: "Кач", id: 2}, ], {id: 2}));
        // let userCookies = {login: 'user1', pass: '123456'};
        // // $cookies.dotobject = someSessionObj;
        // $cookieStore.put('user', userCookies);
        // console.log($cookies.getObject('user').login);

        // let time = new Date();
        // now.setMinutes(now.getMinutes() + 1);
        // let timeShift = now.setMinutes(now.getMinutes() + 20);
        // console.log(timeShift);
        // $cookies.put("test", "testText", {expires: timeShift});

        // var now = new Date();
        // now.setMinutes(now.getMinutes() + 30);
        // console.log( now );
        // console.log( now.setMinutes(now.getMinutes() + 30) );
        //
        // var now = new Date();
        // now.setMinutes(now.getMinutes() + 1);
        // $cookies.put("test", "testText", {expires: now);
        // // alert("!");
        // console.log($cookies.get("test"));


        // for use inline of views
        $scope.goTo = function(path){
            $location.path(path);
        };
        // route history
        $scope.history = [];

        // extend the scope
        angular.extend($scope, $userProvider, true);

        // $cookies.remove('user');
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
                    alert('Access denied!');
                    $location.path(prevUrl.split('#')[1]);
                }
            } else if ($location.path() == '/login' && $userProvider.getUser()) { // already authorized
                $location.path(prevUrl.split('#')[1]);
            }

            if ($location.path() == '/redirect') {
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