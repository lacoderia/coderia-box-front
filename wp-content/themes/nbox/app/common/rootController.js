'use strict';

nbox.controller('RootController', ['$rootScope', 'SessionService', 'LoginService', 'UtilsService', 'LoggerService', function($rootScope, SessionService, LoginService, UtilsService, LoggerService){

    // Private variables
    /**
     *
     */
    var rootCtrl = this;

    rootCtrl.getLoginActionText = function() {
        var text = "Inicia sesión";
        if(SessionService.isAuthenticated()){
            text = "Ir a mi cuenta";
        }

        return text;
    };

    rootCtrl.loginAction = function(){
        if(SessionService.isAuthenticated()){
            window.location.href = UtilsService.getHomeUrl() + 'mi-cuenta';
        } else {
            $rootScope.$broadcast('showLogin')
        }
    };

    rootCtrl.init = function(homeUrl){
        UtilsService.setHomeUrl(homeUrl);

        if(SessionService.isHttpHeaders()){
            SessionService.configHttpHeaders();

            LoginService.getCurrentSession()
                .then(function(data){
                    $rootScope.$broadcast('hideLogin');
                }, function(error){
                    LoggerService.$logger().error(error);
                });
        }

    };

}]);