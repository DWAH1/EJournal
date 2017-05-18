let authorizationModule = angular.module('authorizationModule', []);

authorizationModule.factory('authorizationFactory',['$userProvider', '$cookies',
    function($userProvider, $cookies) {
        let login = function(login, pass) {

            // check
            if (!login || login.length < 3) {
                return false
            } else if (pass !== '1') {
                return false;
            }

            // let userRole = login === 'admin' ?
            //     $userProvider.rolesEnum.Admin :

            if (login === 'admin') {
                $userProvider.setUser({Login: login, Roles: [$userProvider.rolesEnum.Admin]});
            } else {
                $userProvider.setUser({Login: login, Roles: [$userProvider.rolesEnum.User, $userProvider.rolesEnum.Other]});
            }

            let timeExpires = new Date();
            timeExpires.setMinutes(timeExpires.getMinutes() + 20);
            $cookies.putObject('user', {login: login, pass: pass, role: $userProvider.getUserRole()}, {expires: timeExpires});

            return true;
        };

        let logOut = function () {
            $userProvider.excludeUser();
            $cookies.remove('user');
        };

        let restoreUserFromCookies = function(cookies) {
            if (cookies) {
                $userProvider.setUser({Login: cookies.login, Roles: cookies.role});
            }
        };

        let updateUserCookies = function () {
            if ($cookies.get('user')) {
                let timeExpires = new Date();
                timeExpires.setMinutes(timeExpires.getMinutes() + 20);

                let oldUserCookies = $cookies.getObject('user');
                $cookies.remove('user');
                $cookies.putObject('user', oldUserCookies, {expires: timeExpires});
            }
        };

        return {
            login: login,
            logOut: logOut,
            restoreUserFromCookies: restoreUserFromCookies,
            updateUserCookies: updateUserCookies
        };

    }]);

authorizationModule.factory('$userProvider', function(){

    let user = null;

    let rolesEnum = {
        Admin: 0,
        User: 1,
        Other: 2
    };

    let setUser = function(u) {
        user = u;
    };

    let getUser = function() {
        return user;
    };

    let excludeUser = function () {
        user = null;
    };

    let getUserRole = function () {
        return user.Roles;
    };

    return {
        getUser: getUser,
        setUser: setUser,
        excludeUser: excludeUser,
        getUserRole: getUserRole,
        rolesEnum: rolesEnum
    };
});