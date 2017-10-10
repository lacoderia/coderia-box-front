'use strict';

nbox.controller('NavigationController', ['$rootScope', '$compile', 'SessionService', 'LoginService', 'LoggerService', 'UtilsService', 'usSpinnerService', function($rootScope, $compile, SessionService, LoginService, LoggerService, UtilsService, usSpinnerService){

    var navigationCtrl = this;

    navigationCtrl.isLoggedIn = function() {
        return SessionService.isAuthenticated();
    };

    navigationCtrl.getGreetings = function() {
        return (SessionService.get())? SessionService.get().getFirstName(): '';
    };

    navigationCtrl.getUserClassesLeft = function() {
        return (SessionService.get())? SessionService.get().getClassesLeft(): '';
    };

    navigationCtrl.showLogin = function() {
        $rootScope.$broadcast('showLogin');
    };

    navigationCtrl.logout = function() {
        usSpinnerService.spin('full-spinner');
        LoginService.logout()
            .then(function(data) {
                window.location.href = UtilsService.getHomeUrl();
            }, function(error) {
                if(error && error.errors){
                    LoggerService.$logger().error(error.errors[0].title);
                } else {
                    LoggerService.$logger().error(error);
                }
                usSpinnerService.stop('full-spinner');
            });
    };

    navigationCtrl.init = function() {
        angular.element(document).ready(function () {
            var $targetDom = jQuery('#mobile_menu');
            var htmlToCompile = angular.copy($targetDom.html());
            var $scope = $targetDom.html(htmlToCompile).scope();
            $compile($targetDom)($scope || $rootScope);
        });

    };

}]);