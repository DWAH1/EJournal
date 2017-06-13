authorizationModule.controller('loginCtrl', ['$scope', 'authorizationFactory', '$location',
    function($scope, authorizationFactory, $location) {

        let loginJBox = new jBox('Modal', {
            id: "jBoxlogin",
            width: 400,
            animation: 'pulse',
            content: $('#loginPopup'),
            onClose: function () {
                if ($("#jBoxlogin").hasClass("error")) {
                    $("#jBoxlogin").removeClass("error");
                }
                if ($("#jBoxlogin .message").length) {
                    $("#jBoxlogin .message").remove();
                }
                $("#loginPopup input").val("");
            }
        });

        let aboutJBox = new jBox('Modal', {
            width: 400,
            animation: 'pulse',
            content: $('#aboutPopup')
        });

        $scope.isLoading = false;

        $scope.loginClick = function() {

            if (!$scope.form_authorization.$valid)
                return;

            $scope.isLoading = true;

            authorizationFactory.login($scope.login, $scope.pass).then(function (isAuth) {
                if (isAuth) {

                    loginJBox.close();
                    loginJBox.destroy();
                    aboutJBox.destroy();

                    $location.path('/reports');
                } else {
                    $("#loginPopup input").val("");
                    $("#jBoxlogin").addClass("error");
                    $(".authorization").append("<span class='message'>Unauthorized</span>");
                    $scope.isLoading = false;
                }
            });

        };

        $scope.openLoginPopup = function () {
            loginJBox.open();
        };

        $scope.openAboutPopup = function () {
            aboutJBox.open();
        };

        $(document).on("input", "#loginPopup input", function () {
           $("#jBoxlogin").removeClass("error");
           $("#jBoxlogin .message").remove();
        });

}]);