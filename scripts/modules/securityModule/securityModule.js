angular.module('securityModule', ['authorizationModule'])
    .factory('$pagesSecurityService', ['$userProvider', '$location',
        function ($userProvider, $location) {
            var checkAuthorize = function(path) {
                if ($userProvider.getUser() == null) {
                    return $location.path('/login');
                }
                // console.log($userProvider.getUser());
                switch (path) {
                    //запрещенный ресурс
                    case '/settings':
                        return checkPageSecurity({
                            //роли текущего пользователя
                            UserRoles: $userProvider.getUser().Roles,
                            //роли, которым доступен ресурс
                            AvailableRoles: [
                                $userProvider.rolesEnum.Admin
                            ]
                        });
                    default:
                        return true;
                }
            };

            var checkPageSecurity = function (config) {
                var authorize = false;
                for (let i in config.UserRoles) {
                    if ($.inArray(config.UserRoles[i], config.AvailableRoles) == -1) {
                        authorize = false;
                    } else {
                        authorize = true;
                        break;
                    }
                }
                return authorize;
            };

            return {
                checkAuthorize: checkAuthorize
            };
        }]);